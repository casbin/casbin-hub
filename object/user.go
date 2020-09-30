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

package object

import (
	"github.com/astaxie/beego"
)

type User struct {
	Github  string `xorm:"varchar(100)" unique pk" json:"github"`
	Email   string `json:"email"`
	Avatar  string `json:"avatar"`
	IsAdmin bool   `json:"isAdmin"`
}

type UserList []*User

func (list UserList) Len() int {
	return len(list)
}

func (list UserList) Swap(i, j int) {
	list[i], list[j] = list[j], list[i]
}

func GetUser(user string) *User {
	u := User{Github: user}
	has, err := ormManager.engine.Get(&u)
	if err != nil {
		beego.Error(err)
	}

	if has {
		return &u
	}
	return nil
}

func IsUserAdmin(user string) bool {
	objUser := User{Github: user}
	has, err := ormManager.engine.Get(&objUser)
	if err != nil {
		beego.Error(err)
	}
	if has {
		return objUser.IsAdmin
	}
	return false
}

func HasGithub(github string) string {
	user := GetGithub(github)
	if user != nil {
		return user.Github
	}
	return ""
}

func GetGithub(github string) *User {
	user := User{Github: github}
	tableExisted, err := ormManager.engine.IsTableExist(new(User))
	if err != nil {
		beego.Error(err)
		return nil
	}
	if !tableExisted {
		err = createUserTable()
		if err != nil {
			beego.Error(err)
			return nil
		}
	}
	existed, err := ormManager.engine.Get(&user)
	if err != nil {
		beego.Error(err)
		return nil
	}

	if existed {
		return &user
	}
	return nil
}

func createUserTable() error {
	return ormManager.engine.Sync2(new(User))
}

func dropUserTable() error {
	return ormManager.engine.DropTables(new(User))
}

func LinkUserAccount(Github, Email, Avatar string, IsAdmin bool) bool {
	user := &User{
		Github:  Github,
		Email:   Email,
		Avatar:  Avatar,
		IsAdmin: IsAdmin,
	}
	affected, err := ormManager.engine.Table(new(User)).Insert(user)
	if err != nil {
		beego.Error(err)
		return affected == 0
	}
	return affected != 0
}
