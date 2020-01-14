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

func GetModel(id string) *Model {
	model := Model{Id: id}
	existed, err := ormManager.engine.Get(&model)
	if err != nil {
		panic(err)
	}

	if existed {
		return &model
	} else {
		return nil
	}
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

func UpdateModel(model *Model) bool {
	affected, err := ormManager.engine.Id(model.Id).AllCols().Update(model)
	if err != nil {
		panic(err)
	}

	return affected != 0
}
