package routers

import (
	"github.com/astaxie/beego"

	"github.com/casbin/casbin-dashboard/controllers"
)

func init() {
	initAPI()
}

func initAPI() {
	ns :=
		beego.NewNamespace("/api",
			beego.NSInclude(
				&controllers.ApiController{},
			),
		)
	beego.AddNamespace(ns)

	beego.Router("/api/v1/adapters", &controllers.ApiController{}, "GET:GetAdapters;POST:UpdateAdapters")
	beego.Router("/api/v1/adapter", &controllers.ApiController{}, "GET:GetAdapter;POST:UpdateAdapter;DELETE:DeleteAdapter")
	beego.Router("/api/v1/test-adapter-connection", &controllers.ApiController{}, "POST:TestAdapterConnection")
	beego.Router("/api/v1/adapter-policies", &controllers.ApiController{}, "GET:GetAdapterPolicies")
	beego.Router("/api/v1/-adapter-grouping-policies", &controllers.ApiController{}, "GET:GetAdapterGroupingPolicies")
	beego.Router("/api/v1/adapter-policy", &controllers.ApiController{}, "POST:AddAdapterPolicy;DELETE:RemoveAdapterPolicy")
	beego.Router("/api/v1/adapter-all-policies", &controllers.ApiController{}, "POST:SetAdapterAllPolicies")
	beego.Router("/api/v1/empty-adapter", &controllers.ApiController{}, "GET:GetEmptyAdapter")

	beego.Router("/api/v1/models", &controllers.ApiController{}, "GET:GetModels;POST:UpdateModels")
	beego.Router("/api/v1/model", &controllers.ApiController{}, "GET:GetModel;POST:UpdateModel;DELETE:DeleteModel")
	beego.Router("/api/v1/empty-model", &controllers.ApiController{}, "GET:GetEmptyModel")

	beego.Router("/api/v1/enforcers", &controllers.ApiController{}, "GET:GetEnforcers;POST:UpdateEnforcers")
	beego.Router("/api/v1/enforcer", &controllers.ApiController{}, "GET:GetEnforcer;POST:UpdateEnforcer;DELETE:DeleteEnforcer")
	beego.Router("/api/v1/empty-enforcer", &controllers.ApiController{}, "GET:GetEmptyEnforcer")

	beego.Router("/api/v1/policyLists", &controllers.ApiController{}, "GET:GetPolicyLists;POST:UpdatePolicyLists")
	beego.Router("/api/v1/policyList", &controllers.ApiController{}, "GET:GetPolicyList;POST:UpdatePolicyList;DELETE:DeletePolicyList")
	beego.Router("/api/v1/empty-policyList", &controllers.ApiController{}, "GET:GetEmptyPolicyList")
}
