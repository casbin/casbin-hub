// Copyright 2020 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package controllers

import (
	"github.com/casbin/casbin-dashboard/object"
	"github.com/casbin/casbin-dashboard/util"

	"context"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"sync"

	"github.com/astaxie/beego"
	"golang.org/x/oauth2"
)

var githubEndpoint = oauth2.Endpoint{
	AuthURL:  "https://github.com/login/oauth/authorize",
	TokenURL: "https://github.com/login/oauth/access_token",
}

var githubOauthConfig = &oauth2.Config{
	ClientID:     beego.AppConfig.String("GithubAuthClientID"),
	ClientSecret: beego.AppConfig.String("GithubAuthClientSecret"),
	RedirectURL:  "",
	Scopes:       []string{"user:email", "read:user"},
	Endpoint:     githubEndpoint,
}

func (c *ApiController) AuthGithub() {
	code := c.Input().Get("code")
	state := c.Input().Get("state")
	addition := c.Input().Get("addition")
	RedirectURL := c.Input().Get("redirect_url")
	var resp Response
	var res authResponse
	res.IsAuthenticated = true

	if state != beego.AppConfig.String("GithubAuthState") {
		beego.Error("Uable to match state!")
		res.IsAuthenticated = false
		resp = Response{Status: "fail", Msg: "unauthorized", Data: res}
		c.Data["json"] = resp
		c.ServeJSON()
		return
	}

	githubOauthConfig.RedirectURL = RedirectURL

	// https://github.com/golang/oauth2/issues/123#issuecomment-103715338
	token, err := githubOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		beego.Error("Unexpected error while processing get token!")
		res.IsAuthenticated = false
		resp = Response{Status: "fail", Msg: "unauthorized", Data: res}
		c.Data["json"] = resp
		c.ServeJSON()
		return
	}
	if !token.Valid() {
		beego.Error("Unvalid token!")
		resp = Response{Status: "fail", Msg: "unauthorized", Data: res}
		c.Data["json"] = resp
		c.ServeJSON()
		return
	}
	var wg sync.WaitGroup
	var tempUserEmail []userEmailFromGithub
	var tempUserAccount userInfoFromGithub
	wg.Add(2)
	client := &http.Client{}
	go func() {
		defer wg.Done()
		req, err := http.NewRequest("GET", "https://api.github.com/user/emails", nil)
		if err != nil {
			res.IsAuthenticated = false
			beego.Error("Unexpected error while generate request", err)
		} else {
			req.Header.Add("access", "application/vnd.github.v3+json")
			req.Header.Add("Authorization", "token "+token.AccessToken)
			response, err := client.Do(req)
			if err != nil {
				res.IsAuthenticated = false
				beego.Error(err)
			} else {
				defer response.Body.Close()
				contents, err := ioutil.ReadAll(response.Body)
				err = json.Unmarshal(contents, &tempUserEmail)
				if err != nil {
					res.IsAuthenticated = false
					beego.Error(err)
				}
				for _, v := range tempUserEmail {
					if v.Primary == true {
						res.Email = v.Email
						break
					}
				}
			}
		}
	}()
	go func() {
		defer wg.Done()
		req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
		if err != nil {
			res.IsAuthenticated = false
			beego.Error("Unexpected error while generate request", err)
		} else {
			req.Header.Add("access", "application/vnd.github.v3+json")
			req.Header.Add("Authorization", "token "+token.AccessToken)
			response2, err := client.Do(req)
			if err != nil {
				res.IsAuthenticated = false
				beego.Error("Unexpected error while processing get account", err)
			} else {
				defer response2.Body.Close()
				contents2, err := ioutil.ReadAll(response2.Body)
				err = json.Unmarshal(contents2, &tempUserAccount)
				if err != nil {
					res.IsAuthenticated = false
					beego.Error("Unexpected error while processing get account", err)
				}
			}
		}
	}()
	wg.Wait()
	if res.IsAuthenticated == false {
		c.SetSessionUser("")
		resp = Response{Status: "fail", Msg: "unauthorized", Data: res}
		c.Data["json"] = resp
		c.ServeJSON()
		return
	} else {
		if addition == "signup" {
			Github := object.HasGithub(tempUserAccount.Login)
			if Github != "" {
				c.SetSessionUser(Github)
				util.LogInfo(c.Ctx, "API: [%s] signed in", Github)
				res.IsSignedUp = true
			} else {
				c.SetSessionUser(Github)
				util.LogInfo(c.Ctx, "API: [%s] signed in", Github)
				res.IsSignedUp = true
			}
			res.Addition = tempUserAccount.Login
			res.Avatar = tempUserAccount.AvatarUrl
			if Github == "438561537" || Github == "hsluoyz" || Github == "nodece" || Github == "BetaCat0" {
				res.IsAdmin = true
			} else {
				res.IsAdmin = false
			}
			_ = object.LinkUserAccount(res.Addition, res.Email, res.Avatar, res.IsAdmin)
			resp = Response{Status: "ok", Msg: "success", Data: res}
		}
		c.Data["json"] = resp
		c.ServeJSON()
		return
	}
}

// @Title Logout
// @Description logout the current user
// @Success 200 {object} controllers.api_controller.Response The Response object
// @router /logout [post]
func (c *ApiController) Logout() {
	var resp Response

	user := c.GetSessionUser()
	util.LogInfo(c.Ctx, "API: [%s] logged out", user)

	c.SetSessionUser("")
	resp = Response{Status: "ok", Msg: "Logged out successfully", Data: user}
	c.Data["json"] = resp
	c.ServeJSON()
}

func (c *ApiController) GetUser() {
	var userObj interface{}
	username := c.Input().Get("username")
	userObj = object.GetUser(username)

	c.Data["json"] = userObj
	c.ServeJSON()
}

func (c *ApiController) GetAccount() {
	var resp Response

	if c.GetSessionUser() == "" {
		resp = Response{Status: "error", Msg: "Please login first", Data: c.GetSessionUser()}
		c.Data["json"] = resp
		c.ServeJSON()
		return
	}

	var userObj interface{}
	username := c.GetSessionUser()
	userObj = object.GetUser(username)
	resp = Response{Status: "ok", Msg: "", Data: userObj}
	c.Data["json"] = resp
	c.ServeJSON()
}
