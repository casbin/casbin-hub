package object

type Model struct {
	Id   string `xorm:"varchar(100) notnull pk" json:"id"`
	Name string `xorm:"varchar(100)" json:"name"`
	Type string `xorm:"varchar(100)" json:"type"`
	Text string `xorm:"varchar(5000)" json:"text"`
}

func GetModels() []*Model {
	models := []*Model{}
	err := ormManager.engine.Asc("id").Find(&models)
	if err != nil {
		panic(err)
	}

	return models
}

func createModelTable() error {
	return ormManager.engine.Sync2(new(Model))
}

func dropModelTable() error {
	return ormManager.engine.DropTables(new(Model))
}

func UpdateModels(models []*Model) bool {
	err := dropModelTable()
	if err != nil {
		panic(err)
	}

	err = createModelTable()
	if err != nil {
		panic(err)
	}

	affected, err := ormManager.engine.Insert(&models)
	if err != nil {
		panic(err)
	}

	return affected != 0
}
