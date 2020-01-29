package object

import (
	"github.com/casbin/casbin"
	"github.com/casbin/casbin/model"
	xormadapter "github.com/casbin/xorm-adapter"
)

var rbacModel = `
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
`

type CasbinRule struct {
	PType string `xorm:"varchar(100) index not null default ''" json:"pType"`
	V0    string `xorm:"varchar(100) index not null default ''" json:"v0"`
	V1    string `xorm:"varchar(100) index not null default ''" json:"v1"`
	V2    string `xorm:"varchar(100) index not null default ''" json:"v2"`
	V3    string `xorm:"varchar(100) index not null default ''" json:"v3"`
	V4    string `xorm:"varchar(100) index not null default ''" json:"v4"`
	V5    string `xorm:"varchar(100) index not null default ''" json:"v5"`
}

func (adapter *Adapter) TestConnection() (bool, string) {
	_, err := xormadapter.NewAdapter(adapter.Param1, adapter.Param2)
	if err == nil {
		return true, ""
	} else {
		return false, err.Error()
	}
}

func safeReturn(policy []string, i int) string {
	if len(policy) > i {
		return policy[i]
	} else {
		return ""
	}
}

func matrixToCasbinRules(policies [][]string) []*CasbinRule {
	res := []*CasbinRule{}

	for _, policy := range policies {
		line := CasbinRule{
			PType: "p",
			V0:    safeReturn(policy, 0),
			V1:    safeReturn(policy, 1),
			V2:    safeReturn(policy, 2),
			V3:    safeReturn(policy, 3),
			V4:    safeReturn(policy, 4),
			V5:    safeReturn(policy, 5),
		}
		res = append(res, &line)
	}

	return res
}

func getEnforcer(adapter *Adapter) (*casbin.Enforcer, error) {
	a, err := xormadapter.NewAdapter(adapter.Param1, adapter.Param2)
	if err != nil {
		return nil, err
	}

	m, err := model.NewModelFromString(rbacModel)
	if err != nil {
		return nil, err
	}

	e, err := casbin.NewEnforcer(m, a)
	return e, err
}

func GetAdapterPolicies(adapter *Adapter) (bool, string, []*CasbinRule) {
	e, err := getEnforcer(adapter)
	if err != nil {
		return false, err.Error(), nil
	}

	return true, "", matrixToCasbinRules(e.GetPolicy())
}

func GetAdapterGroupingPolicies(adapter *Adapter) (bool, string, []*CasbinRule) {
	e, err := getEnforcer(adapter)
	if err != nil {
		return false, err.Error(), nil
	}

	return true, "", matrixToCasbinRules(e.GetGroupingPolicy())
}
