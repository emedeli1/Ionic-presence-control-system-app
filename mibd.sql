CREATE DATABASE control_presencia;

USE control_presencia;

CREATE TABLE Usuarios (
  IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(100) NOT NULL,
  Usuario VARCHAR(50),
  Clave VARCHAR(50)
);

CREATE TABLE Trabajos (
  IdTrabajo INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(200) NOT NULL
);

CREATE TABLE Fichajes (
  IdFichaje INT PRIMARY KEY AUTO_INCREMENT,
  FechaHoraEntrada DATETIME,
  FechaHoraSalida DATETIME,
  HorasTrabajadas INT,
  IdTrabajo INT,
  IdUsuario INT,
  GeolocalizacionLatitud FLOAT,
  GeolocalizacionLongitud FLOAT,
  FOREIGN KEY (IdTrabajo) REFERENCES Trabajos(IdTrabajo),
  FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario)
);

CREATE TABLE ApiKey (
  idKey INT PRIMARY KEY AUTO_INCREMENT,
  api_key VARCHAR(50) NOT NULL
);
