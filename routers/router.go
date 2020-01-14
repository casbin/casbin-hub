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
	beego.Router("/api/get-adapters", &controllers.ApiController{}, "GET:GetAdapter")
	beego.Router("/api/update-adapters", &controllers.ApiController{}, "POST:UpdateAdapters")
	beego.Router("/api/get-models", &controllers.ApiController{}, "GET:GetModels")
	beego.Router("/api/update-models", &controllers.ApiController{}, "POST:UpdateModels")
	beego.Router("/api/get-enforcers", &controllers.ApiController{}, "GET:GetEnforcers")
	beego.Router("/api/update-enforcers", &controllers.ApiController{}, "POST:UpdateEnforcers")
}
