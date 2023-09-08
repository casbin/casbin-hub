package controllers

import (
	"encoding/json"

	"github.com/casbin/casbin-hub/object"
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

func (c *ApiController) GetEmptyEnforcer() {
	c.Data["json"] = object.NewEnforcer()
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

func (c *ApiController) UpdateEnforcer() {
	var enforcer *object.Enforcer

	err := json.Unmarshal(c.Ctx.Input.RequestBody, &enforcer)
	if err != nil {
		panic(err)
	}
	c.Data["json"] = object.UpdateEnforcer(enforcer)
	c.ServeJSON()
}

func (c *ApiController) DeleteEnforcer() {
	var enforcer *object.Enforcer
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &enforcer)
	if err != nil {
		panic(err)
	}
	c.Data["json"] = object.DeleteEnforcer(enforcer)
	c.ServeJSON()
}
