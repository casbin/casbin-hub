package object

type Adapter struct {
	Id            string   `xorm:"varchar(100) notnull pk" json:"id"`
	Name          string   `xorm:"varchar(100)" json:"name"`
	Type          string   `xorm:"varchar(100)" json:"type"`
	Param1        string   `xorm:"varchar(500)" json:"param1"`
	Param2        string   `xorm:"varchar(500)" json:"param2"`
	PolicyHeaders []string `json:"policyHeaders"`
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
