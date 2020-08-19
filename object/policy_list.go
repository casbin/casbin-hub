package object
type PolicyList struct {
	Id         string   `xorm:"varchar(100) notnull pk" json:"id"`
	RuleType            string   `xorm:"varchar(100)" json:"ruleType"`
	Tenant          string   `xorm:"varchar(100)" json:"tenant"`
	User          string   `xorm:"varchar(100)" json:"user"`
	ResourcePath        string   `xorm:"varchar(500)" json:"resourcePath"`
	Action        string   `xorm:"varchar(500)" json:"action"`
	Service        string   `xorm:"varchar(500)" json:"service"`
	AuthEffect        string   `xorm:"varchar(500)" json:"authEffect"`
}

func GetPolicyLists() []*PolicyList {
	policyLists := []*PolicyList{}
	err := ormManager.engine.Asc("id").Find(&policyLists)
	if err != nil {
		panic(err)
	}
	return policyLists
}

func GetPolicyList(id string) *PolicyList {
	policyList := PolicyList{Id: id}
	existed, err := ormManager.engine.Get(&policyList)
	if err != nil {
		panic(err)
	}

	if existed {
		return &policyList
	} else {
		return nil
	}
}

func NewPolicyList() *PolicyList {
	return &PolicyList{
		Id:              "",
		RuleType:        "",
		Tenant:          "",
		User:            "",
		ResourcePath:    "",
		Action:          "", 
		Service:         "", 
		AuthEffect:      "", 
	}
}

func createPolicyListTable() error {
	return ormManager.engine.Sync2(new(PolicyList))
}

func dropPolicyListTable() error {
	return ormManager.engine.DropTables(new(PolicyList))
}

func UpdatePolicyLists(policyLists []*PolicyList) bool {
	err := dropPolicyListTable()
	if err != nil {
		panic(err)
	}

	err = createPolicyListTable()
	if err != nil {
		panic(err)
	}

	affected, err := ormManager.engine.Insert(&policyLists)
	if err != nil {
		panic(err)
	}

	return affected != 0
}

func UpdatePolicyList(policyList *PolicyList) bool {
	affected, err := ormManager.engine.Insert(policyList)
	if err != nil {
		panic(err)
	}
	return affected != 0
}

func DeletePolicyList(policyList *PolicyList) bool {
	affected, err := ormManager.engine.Delete(policyList)
	if err != nil {
		panic(err)
	}
	return affected != 0
}


