package controllers

import (
	"encoding/json"
	"github.com/casbin/casbin-dashboard/object"
)

func (c *ApiController) GetPolicyLists() {
	c.Data["json"] = object.GetPolicyLists()
	c.ServeJSON()
}

func (c *ApiController) GetEmptyPolicyList() {
	c.Data["json"] = object.NewPolicyList()
	c.ServeJSON()
}

func (c *ApiController) GetPolicyList() {
	id := c.Input().Get("id")

	c.Data["json"] = object.GetPolicyList(id)
	c.ServeJSON()
}

func (c *ApiController) UpdatePolicyList() {
	var policyList *object.PolicyList
	
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &policyList)
	if err != nil {
		panic(err)
	}
	c.Data["json"] = object.UpdatePolicyList(policyList)
	c.ServeJSON()
}

func (c *ApiController) DeletePolicyList() {
	var policyList *object.PolicyList
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &policyList)
	if err != nil {
		panic(err)
	}
	c.Data["json"] = object.DeletePolicyList(policyList)
	c.ServeJSON()
}



