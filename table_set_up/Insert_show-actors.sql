CREATE TABLE Shows_Actors(
	Show_ID INT REFERENCES Shows(ID) ,
	Actors_ID INT REFERENCES Actors(ID)
	)