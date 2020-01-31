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

	beego.Router("/api/get-adapters", &controllers.ApiController{}, "GET:GetAdapters")
	beego.Router("/api/get-adapter", &controllers.ApiController{}, "GET:GetAdapter")
	beego.Router("/api/update-adapters", &controllers.ApiController{}, "POST:UpdateAdapters")
	beego.Router("/api/update-adapter", &controllers.ApiController{}, "POST:UpdateAdapter")
	beego.Router("/api/test-adapter-connection", &controllers.ApiController{}, "POST:TestAdapterConnection")
	beego.Router("/api/get-adapter-policies", &controllers.ApiController{}, "GET:GetAdapterPolicies")
	beego.Router("/api/get-adapter-grouping-policies", &controllers.ApiController{}, "GET:GetAdapterGroupingPolicies")
	beego.Router("/api/add-adapter-policy", &controllers.ApiController{}, "POST:AddAdapterPolicy")
	beego.Router("/api/remove-adapter-policy", &controllers.ApiController{}, "POST:RemoveAdapterPolicy")
	beego.Router("/api/set-adapter-all-policies", &controllers.ApiController{}, "POST:SetAdapterAllPolicies")

	beego.Router("/api/get-models", &controllers.ApiController{}, "GET:GetModels")
	beego.Router("/api/get-model", &controllers.ApiController{}, "GET:GetModel")
	beego.Router("/api/update-models", &controllers.ApiController{}, "POST:UpdateModels")
	beego.Router("/api/update-model", &controllers.ApiController{}, "POST:UpdateModel")

	beego.Router("/api/get-enforcers", &controllers.ApiController{}, "GET:GetEnforcers")
	beego.Router("/api/get-enforcer", &controllers.ApiController{}, "GET:GetEnforcer")
	beego.Router("/api/update-enforcers", &controllers.ApiController{}, "POST:UpdateEnforcers")
}
