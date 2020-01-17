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

type Adapter struct {
	Id     string `xorm:"varchar(100) notnull pk" json:"id"`
	Name   string `xorm:"varchar(100)" json:"name"`
	Type   string `xorm:"varchar(100)" json:"type"`
	Param1 string `xorm:"varchar(500)" json:"param1"`
	Param2 string `xorm:"varchar(500)" json:"param2"`
}

type CasbinRule struct {
	PType string `xorm:"varchar(100) index not null default ''" json:"pType"`
	V0    string `xorm:"varchar(100) index not null default ''" json:"v0"`
	V1    string `xorm:"varchar(100) index not null default ''" json:"v1"`
	V2    string `xorm:"varchar(100) index not null default ''" json:"v2"`
	V3    string `xorm:"varchar(100) index not null default ''" json:"v3"`
	V4    string `xorm:"varchar(100) index not null default ''" json:"v4"`
	V5    string `xorm:"varchar(100) index not null default ''" json:"v5"`
}

func GetAdapters() []*Adapter {
	adapters := []*Adapter{}
	err := ormManager.engine.Asc("id").Find(&adapters)
	if err != nil {
		panic(err)
	}

	return adapters
}

func GetAdapter(id string) *Adapter {
	adapter := Adapter{Id: id}
	existed, err := ormManager.engine.Get(&adapter)
	if err != nil {
		panic(err)
	}

	if existed {
		return &adapter
	} else {
		return nil
	}
}

func createAdapterTable() error {
	return ormManager.engine.Sync2(new(Adapter))
}

func dropAdapterTable() error {
	return ormManager.engine.DropTables(new(Adapter))
}

func UpdateAdapters(adapters []*Adapter) bool {
	err := dropAdapterTable()
	if err != nil {
		panic(err)
	}

	err = createAdapterTable()
	if err != nil {
		panic(err)
	}

	affected, err := ormManager.engine.Insert(&adapters)
	if err != nil {
		panic(err)
	}

	return affected != 0
}

func UpdateAdapter(adapter *Adapter) bool {
	affected, err := ormManager.engine.Id(adapter.Id).AllCols().Update(adapter)
	if err != nil {
		panic(err)
	}

	return affected != 0
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
			PType: safeReturn(policy, 0),
			V0:    safeReturn(policy, 1),
			V1:    safeReturn(policy, 2),
			V2:    safeReturn(policy, 3),
			V3:    safeReturn(policy, 4),
			V4:    safeReturn(policy, 5),
			V5:    safeReturn(policy, 6),
		}
		res = append(res, &line)
	}

	return res
}

func GetAdapterPolicies(adapter *Adapter) (bool, string, []*CasbinRule) {
	a, err := xormadapter.NewAdapter(adapter.Param1, adapter.Param2)
	if err != nil {
		return false, err.Error(), nil
	} else {
		m, err := model.NewModelFromString(rbacModel)
		if err != nil {
			return false, err.Error(), nil
		}

		e, err := casbin.NewEnforcer(m, a)
		if err != nil {
			return false, err.Error(), nil
		} else {
			return true, "", matrixToCasbinRules(e.GetPolicy())
		}
	}
}
