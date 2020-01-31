package controllers

import (
	"encoding/json"

	"github.com/casbin/casbin-dashboard/object"
)

type Response struct {
	Status string      `json:"status"`
	Msg    string      `json:"msg"`
	Data   interface{} `json:"data"`
}

func (c *ApiController) GetAdapters() {
	c.Data["json"] = object.GetAdapters()
	c.ServeJSON()
}

func (c *ApiController) GetAdapter() {
	id := c.Input().Get("id")

	c.Data["json"] = object.GetAdapter(id)
	c.ServeJSON()
}

func (c *ApiController) UpdateAdapters() {
	var adapters []*object.Adapter
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &adapters)
	if err != nil {
		panic(err)
	}

	c.Data["json"] = object.UpdateAdapters(adapters)
	c.ServeJSON()
}

func (c *ApiController) UpdateAdapter() {
	var adapter *object.Adapter
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &adapter)
	if err != nil {
		panic(err)
	}

	c.Data["json"] = object.UpdateAdapter(adapter)
	c.ServeJSON()
}

func (c *ApiController) TestAdapterConnection() {
	var resp Response

	var adapter *object.Adapter
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &adapter)
	if err != nil {
		panic(err)
	}

	isOk, msg := adapter.TestConnection()
	if isOk {
		resp = Response{Status: "ok", Msg: ""}
	} else {
		resp = Response{Status: "error", Msg: msg}
	}
	c.Data["json"] = resp
	c.ServeJSON()
}

func (c *ApiController) GetAdapterPolicies() {
	var resp Response

	id := c.Input().Get("id")

	isOk, msg, policies := object.GetAdapterPolicies(id)
	if isOk {
		resp = Response{Status: "ok", Msg: "", Data: policies}
	} else {
		resp = Response{Status: "error", Msg: msg}
	}
	c.Data["json"] = resp
	c.ServeJSON()
}

func (c *ApiController) GetAdapterGroupingPolicies() {
	var resp Response

	id := c.Input().Get("id")

	isOk, msg, policies := object.GetAdapterGroupingPolicies(id)
	if isOk {
		resp = Response{Status: "ok", Msg: "", Data: policies}
	} else {
		resp = Response{Status: "error", Msg: msg}
	}
	c.Data["json"] = resp
	c.ServeJSON()
}

func (c *ApiController) SetAdapterAllPolicies() {
	var resp Response

	id := c.Input().Get("id")

	var policies []*object.CasbinRule
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &policies)
	if err != nil {
		panic(err)
	}

	isOk, msg := object.SetAdapterAllPolicies(id, policies)
	if isOk {
		resp = Response{Status: "ok", Msg: ""}
	} else {
		resp = Response{Status: "error", Msg: msg}
	}
	c.Data["json"] = resp
	c.ServeJSON()
}

func (c *ApiController) AddAdapterPolicy() {
	var resp Response

	id := c.Input().Get("id")

	var policy []string
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &policy)
	if err != nil {
		panic(err)
	}

	isOk, msg := object.AddAdapterPolicy(id, policy...)
	if isOk {
		resp = Response{Status: "ok", Msg: ""}
	} else {
		resp = Response{Status: "error", Msg: msg}
	}
	c.Data["json"] = resp
	c.ServeJSON()
}

func (c *ApiController) RemoveAdapterPolicy() {
	var resp Response

	id := c.Input().Get("id")

	var policy []string
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &policy)
	if err != nil {
		panic(err)
	}

	isOk, msg := object.RemoveAdapterPolicy(id, policy...)
	if isOk {
		resp = Response{Status: "ok", Msg: ""}
	} else {
		resp = Response{Status: "error", Msg: msg}
	}
	c.Data["json"] = resp
	c.ServeJSON()
}
