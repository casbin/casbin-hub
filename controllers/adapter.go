package controllers

import (
	"encoding/json"

	"github.com/casbin/casbin-dashboard/object"
)

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
