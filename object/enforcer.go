package object

type Enforcer struct {
	Id      string `xorm:"varchar(100) notnull pk" json:"id"`
	Name    string `xorm:"varchar(100)" json:"name"`
	Model   string `xorm:"varchar(100)" json:"model"`
	Adapter string `xorm:"varchar(100)" json:"adapter"`
}

func GetEnforcers() []*Enforcer {
	enforcers := []*Enforcer{}
	err := ormManager.engine.Asc("id").Find(&enforcers)
	if err != nil {
		panic(err)
	}

	return enforcers
}

func GetEnforcer(id string) *Enforcer {
	enforcer := Enforcer{Id: id}
	existed, err := ormManager.engine.Get(&enforcer)
	if err != nil {
		panic(err)
	}

	if existed {
		return &enforcer
	} else {
		return nil
	}
}

func createEnforcerTable() error {
	return ormManager.engine.Sync2(new(Enforcer))
}

func dropEnforcerTable() error {
	return ormManager.engine.DropTables(new(Enforcer))
}

func UpdateEnforcers(enforcers []*Enforcer) bool {
	err := dropEnforcerTable()
	if err != nil {
		panic(err)
	}

	err = createEnforcerTable()
	if err != nil {
		panic(err)
	}

	affected, err := ormManager.engine.Insert(&enforcers)
	if err != nil {
		panic(err)
	}

	return affected != 0
}
