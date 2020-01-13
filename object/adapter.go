package object

type Adapter struct {
	Id            string `xorm:"varchar(100) notnull pk" json:"id"`
	Name          string `xorm:"varchar(100)" json:"name"`
	Database      string `xorm:"varchar(100)" json:"database"`
	ConnectString string `xorm:"varchar(100)" json:"connectString"`
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

//func UpdateAdapter(adapter *Adapter) bool {
//	affected, err := ormManager.engine.Id(adapter.Id).AllCols().Update(adapter)
//	if err != nil {
//		panic(err)
//	}
//
//	return affected != 0
//}

func createAdaptersTable() error {
	return ormManager.engine.Sync2(new(Adapter))
}

func dropAdaptersTable() error {
	return ormManager.engine.DropTables(new(Adapter))
}

func UpdateAdapters(adapters []*Adapter) bool {
	err := dropAdaptersTable()
	if err != nil {
		panic(err)
	}

	err = createAdaptersTable()
	if err != nil {
		panic(err)
	}

	affected, err := ormManager.engine.Insert(&adapters)
	if err != nil {
		panic(err)
	}

	return affected != 0
}
