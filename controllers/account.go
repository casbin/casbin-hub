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
	"fmt"

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
		res.IsAuthenticated = false
		resp = Response{Status: "fail", Msg: "unauthorized", Data: res}
		c.ServeJSON()
		return
	}

	githubOauthConfig.RedirectURL = RedirectURL
	fmt.Print(RedirectURL, "\n")

	// https://github.com/golang/oauth2/issues/123#issuecomment-103715338
	// ctx := context.WithValue(oauth2.NoContext, oauth2.HTTPClient, httpClient)
	token, err := githubOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		res.IsAuthenticated = false
		panic(err)
	}
	if !token.Valid() {
		resp = Response{Status: "fail", Msg: "unauthorized", Data: res}
		c.Data["json"] = resp
		c.ServeJSON()
		return
	}
	var wg sync.WaitGroup
	var tempUserEmail []userEmailFromGithub
	var tempUserAccount userInfoFromGithub
	wg.Add(2)
	go func() {
		response, err := http.Get("https://api.github.com/user/emails?access_token=" + token.AccessToken)
		if err != nil {
			panic(err)
		}
		defer response.Body.Close()
		contents, err := ioutil.ReadAll(response.Body)
		err = json.Unmarshal(contents, &tempUserEmail)
		if err != nil {
			res.IsAuthenticated = false
			panic(err)
		}
		for _, v := range tempUserEmail {
			if v.Primary == true {
				res.Email = v.Email
				break
			}
		}
		wg.Done()
	}()
	go func() {
		response2, err := http.Get("https://api.github.com/user?access_token=" + token.AccessToken)
		if err != nil {
			panic(err)
		}
		defer response2.Body.Close()
		contents2, err := ioutil.ReadAll(response2.Body)
		err = json.Unmarshal(contents2, &tempUserAccount)
		if err != nil {
			res.IsAuthenticated = false
			panic(err)
		}
		wg.Done()
	}()
	wg.Wait()

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
			_ = object.LinkUserAccount("github", tempUserAccount.Login)
		}
		res.Addition = tempUserAccount.Login
		res.Avatar = tempUserAccount.AvatarUrl
		if Github == "438561537" || Github == "hsluoyz" || Github == "hsluoyz" || Github == "BetaCat0" {
			res.IsAdmin = true
		} else {
			res.IsAdmin = false
		}
		resp = Response{Status: "ok", Msg: "success", Data: res}
	}
	// } else {
	// 	memberId := c.GetSessionUser()
	// 	if memberId == "" {
	// 		resp = Response{Status: "fail", Msg: "no account exist", Data: res}
	// 		c.Data["json"] = resp
	// 		c.ServeJSON()
	// 		return
	// 	}
	// 	linkRes := object.LinkUserAccount(memberId, "github", tempUserAccount.Login)
	// 	if linkRes {
	// 		resp = Response{Status: "ok", Msg: "success", Data: linkRes}
	// 	} else {
	// 		resp = Response{Status: "fail", Msg: "link account failed", Data: linkRes}
	// 	}
	// }

	c.Data["json"] = resp

	c.ServeJSON()
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
