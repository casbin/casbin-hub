package controllers

import (
	"encoding/json"

	"github.com/casbin/casbin-dashboard/object"
)

func (c *ApiController) GetModels() {
	c.Data["json"] = object.GetModels()
	c.ServeJSON()
}

func (c *ApiController) UpdateModels() {
	var models []*object.Model
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &models)
	if err != nil {
		panic(err)
	}

	c.Data["json"] = object.UpdateModels(models)
	c.ServeJSON()
}
