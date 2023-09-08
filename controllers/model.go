package controllers

import (
	"encoding/json"

	"github.com/casbin/casbin-hub/object"
)

func (c *ApiController) GetModels() {
	c.Data["json"] = object.GetModels()
	c.ServeJSON()
}

func (c *ApiController) GetEmptyModel() {
	c.Data["json"] = object.NewModel()
	c.ServeJSON()
}

func (c *ApiController) GetModel() {
	id := c.Input().Get("id")

	c.Data["json"] = object.GetModel(id)
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

func (c *ApiController) UpdateModel() {
	var model *object.Model
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &model)
	if err != nil {
		panic(err)
	}

	c.Data["json"] = object.UpdateModel(model)
	c.ServeJSON()
}

func (c *ApiController) DeleteModel() {
	var model *object.Model
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &model)
	if err != nil {
		panic(err)
	}
	c.Data["json"] = object.DeleteModel(model)
	c.ServeJSON()
}
