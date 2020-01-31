package controllers

import (
	"encoding/json"

	"github.com/casbin/casbin-dashboard/object"
)

func (c *ApiController) GetEnforcers() {
	c.Data["json"] = object.GetEnforcers()
	c.ServeJSON()
}

func (c *ApiController) GetEnforcer() {
	id := c.Input().Get("id")

	c.Data["json"] = object.GetEnforcer(id)
	c.ServeJSON()
}

func (c *ApiController) UpdateEnforcers() {
	var enforcers []*object.Enforcer
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &enforcers)
	if err != nil {
		panic(err)
	}

	c.Data["json"] = object.UpdateEnforcers(enforcers)
	c.ServeJSON()
}
