BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Roles] (
    [idRol] INT NOT NULL IDENTITY(1,1),
    [displayName] NVARCHAR(1000) NOT NULL,
    [key] NVARCHAR(1000) NOT NULL,
    [level] INT NOT NULL,
    CONSTRAINT [Roles_pkey] PRIMARY KEY CLUSTERED ([idRol])
);

-- CreateTable
CREATE TABLE [dbo].[Empleado] (
    [idEmpleado] INT NOT NULL IDENTITY(1,1),
    [noReloj] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [puesto] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Empleado_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [idFolio] INT NOT NULL,
    [idRol] INT NOT NULL,
    CONSTRAINT [Empleado_pkey] PRIMARY KEY CLUSTERED ([idEmpleado]),
    CONSTRAINT [Empleado_idFolio_key] UNIQUE NONCLUSTERED ([idFolio])
);

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [idUsuario] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [apellidoPat] NVARCHAR(1000) NOT NULL,
    [apellidoMat] NVARCHAR(1000) NOT NULL,
    [sexo] CHAR(1) NOT NULL,
    [edad] INT NOT NULL,
    [estado_civil] NVARCHAR(1000) NOT NULL,
    [tel_personal] NVARCHAR(1000) NOT NULL,
    [tel_emergencia] NVARCHAR(1000) NOT NULL,
    [calle] NVARCHAR(1000) NOT NULL,
    [numero] NVARCHAR(1000) NOT NULL,
    [colonia] NVARCHAR(1000) NOT NULL,
    [escolaridad] NVARCHAR(1000) NOT NULL,
    [idFolio] INT NOT NULL,
    CONSTRAINT [Usuario_pkey] PRIMARY KEY CLUSTERED ([idUsuario]),
    CONSTRAINT [Usuario_idFolio_key] UNIQUE NONCLUSTERED ([idFolio])
);

-- CreateTable
CREATE TABLE [dbo].[SolicitudInterna] (
    [idSolInt] INT NOT NULL IDENTITY(1,1),
    [fecha] DATETIME2 NOT NULL,
    [fechaNac] DATETIME2 NOT NULL,
    [lugarNac] NVARCHAR(1000) NOT NULL,
    [RFC] NVARCHAR(1000) NOT NULL,
    [CURP] NVARCHAR(1000) NOT NULL,
    [NSS] NVARCHAR(1000) NOT NULL,
    [CP] NVARCHAR(1000) NOT NULL,
    [ciudad] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [municipio] NVARCHAR(1000) NOT NULL,
    [viveCon] NVARCHAR(1000) NOT NULL,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [SolicitudInterna_pkey] PRIMARY KEY CLUSTERED ([idSolInt]),
    CONSTRAINT [SolicitudInterna_idUsuario_key] UNIQUE NONCLUSTERED ([idUsuario])
);

-- CreateTable
CREATE TABLE [dbo].[DatosFam] (
    [idDatosFam] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [apellidos] NVARCHAR(1000) NOT NULL,
    [fechaNac] DATETIME2 NOT NULL,
    [idSolInt] INT NOT NULL,
    CONSTRAINT [DatosFam_pkey] PRIMARY KEY CLUSTERED ([idDatosFam])
);

-- CreateTable
CREATE TABLE [dbo].[ExamenMedico] (
    [idExamMed] INT NOT NULL IDENTITY(1,1),
    [planta] NVARCHAR(1000) NOT NULL,
    [fecha] DATETIME2 NOT NULL,
    [fechaNac] DATETIME2 NOT NULL,
    [alcoholismo] NVARCHAR(1000),
    [deporte] NVARCHAR(1000),
    [tabaquismo] NVARCHAR(1000),
    [drogas] NVARCHAR(1000),
    [fechaUltMens] DATETIME2,
    [metPlanFam] NVARCHAR(1000),
    [numEmb] INT,
    [partos] INT,
    [cesareas] INT,
    [abortos] INT,
    [observaciones] NVARCHAR(1000),
    [otraEnferm] NVARCHAR(1000),
    [idUsuario] INT NOT NULL,
    CONSTRAINT [ExamenMedico_pkey] PRIMARY KEY CLUSTERED ([idExamMed]),
    CONSTRAINT [ExamenMedico_idUsuario_key] UNIQUE NONCLUSTERED ([idUsuario])
);

-- CreateTable
CREATE TABLE [dbo].[SelecAntecPatolog] (
    [idSelecAntecPatolog] INT NOT NULL IDENTITY(1,1),
    [idExamMed] INT NOT NULL,
    [idAntecPatolog] INT NOT NULL,
    CONSTRAINT [SelecAntecPatolog_pkey] PRIMARY KEY CLUSTERED ([idSelecAntecPatolog])
);

-- CreateTable
CREATE TABLE [dbo].[AntecPatolog] (
    [idAntecPatolog] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [AntecPatolog_pkey] PRIMARY KEY CLUSTERED ([idAntecPatolog])
);

-- CreateTable
CREATE TABLE [dbo].[AntecFam] (
    [idAntecFam] INT NOT NULL IDENTITY(1,1),
    [parentesco] NVARCHAR(1000) NOT NULL,
    [edad] INT NOT NULL,
    [enfermedad] NVARCHAR(1000) NOT NULL,
    [causaMuerte] NVARCHAR(1000) NOT NULL,
    [idExamMed] INT NOT NULL,
    CONSTRAINT [AntecFam_pkey] PRIMARY KEY CLUSTERED ([idAntecFam])
);

-- CreateTable
CREATE TABLE [dbo].[ExploracionFisica] (
    [idExpFis] INT NOT NULL IDENTITY(1,1),
    [peso] INT NOT NULL,
    [talla] INT NOT NULL,
    [temperatura] INT NOT NULL,
    [FR] INT NOT NULL,
    [FC] INT NOT NULL,
    [TA] INT NOT NULL,
    [finkelstein] INT NOT NULL,
    [tinel] INT NOT NULL,
    [phalen] INT NOT NULL,
    [observaciones] NVARCHAR(1000),
    [movAnormales] BIT NOT NULL,
    [marcha] BIT NOT NULL,
    [comprension] INT NOT NULL,
    [visionLejos] INT NOT NULL,
    [visionCerca] INT NOT NULL,
    [daltonismo] INT NOT NULL,
    [OI] INT NOT NULL,
    [OD] INT NOT NULL,
    [calificacion] INT NOT NULL,
    [piel] NVARCHAR(1000) NOT NULL,
    [higiene] NVARCHAR(1000) NOT NULL,
    [tipoPeso] NVARCHAR(1000) NOT NULL,
    [lesionOcular] INT NOT NULL,
    [lesionOido] INT NOT NULL,
    [bocaDienEnc] INT NOT NULL,
    [torax] INT NOT NULL,
    [columVert] INT NOT NULL,
    [extremidades] INT NOT NULL,
    [capacEsp] NVARCHAR(1000) NOT NULL,
    [calificacionFinal] INT NOT NULL,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [ExploracionFisica_pkey] PRIMARY KEY CLUSTERED ([idExpFis]),
    CONSTRAINT [ExploracionFisica_idUsuario_key] UNIQUE NONCLUSTERED ([idUsuario])
);

-- CreateTable
CREATE TABLE [dbo].[EntrevistaInicial] (
    [idEntrevIni] INT NOT NULL IDENTITY(1,1),
    [areaDirige] NVARCHAR(1000) NOT NULL,
    [puesto] NVARCHAR(1000) NOT NULL,
    [turno] CHAR(1) NOT NULL,
    [actualDedica] NVARCHAR(1000) NOT NULL,
    [enteroEmpleo] NVARCHAR(1000) NOT NULL,
    [numIngresos] INT,
    [enQueArea] NVARCHAR(1000),
    [procesoLinea] NVARCHAR(1000),
    [motivoRenuncia] NVARCHAR(1000),
    [cant_hijos] INT,
    [edades_hijos] NVARCHAR(1000),
    [cuidador] NVARCHAR(1000),
    [trab_cuidador] NVARCHAR(1000),
    [empresa1] NVARCHAR(1000),
    [motivoSal1] NVARCHAR(1000),
    [duracion1] NVARCHAR(1000),
    [salario1] NVARCHAR(1000),
    [horario1] NVARCHAR(1000),
    [empresa2] NVARCHAR(1000),
    [motivoSal2] NVARCHAR(1000),
    [duracion2] NVARCHAR(1000),
    [salario2] NVARCHAR(1000),
    [horario2] NVARCHAR(1000),
    [tiempoSinTrab] NVARCHAR(1000),
    [tiempoSalida] NVARCHAR(1000),
    [motivoNoTrab] NVARCHAR(1000),
    [pendientes] NVARCHAR(1000),
    [renta] INT,
    [fonacot] INT,
    [infonavit] INT,
    [antecedentesPen] NVARCHAR(1000),
    [fecha] DATETIME2 NOT NULL,
    [image] NVARCHAR(1000) NOT NULL,
    [encinte] NVARCHAR(1000) NOT NULL,
    [tricky] NVARCHAR(1000) NOT NULL,
    [artesanal] NVARCHAR(1000) NOT NULL,
    [comprension] NVARCHAR(1000) NOT NULL,
    [vista] NVARCHAR(1000) NOT NULL,
    [calificacion] NVARCHAR(1000) NOT NULL,
    [comentarios] NVARCHAR(1000) NOT NULL,
    [bonoContr] INT,
    [areaOPlanta] NVARCHAR(1000) NOT NULL,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [EntrevistaInicial_pkey] PRIMARY KEY CLUSTERED ([idEntrevIni]),
    CONSTRAINT [EntrevistaInicial_idUsuario_key] UNIQUE NONCLUSTERED ([idUsuario])
);

-- AddForeignKey
ALTER TABLE [dbo].[Empleado] ADD CONSTRAINT [Empleado_idFolio_fkey] FOREIGN KEY ([idFolio]) REFERENCES [dbo].[Folio]([idFolio]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Empleado] ADD CONSTRAINT [Empleado_idRol_fkey] FOREIGN KEY ([idRol]) REFERENCES [dbo].[Roles]([idRol]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Usuario] ADD CONSTRAINT [Usuario_idFolio_fkey] FOREIGN KEY ([idFolio]) REFERENCES [dbo].[Folio]([idFolio]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SolicitudInterna] ADD CONSTRAINT [SolicitudInterna_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DatosFam] ADD CONSTRAINT [DatosFam_idSolInt_fkey] FOREIGN KEY ([idSolInt]) REFERENCES [dbo].[SolicitudInterna]([idSolInt]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ExamenMedico] ADD CONSTRAINT [ExamenMedico_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SelecAntecPatolog] ADD CONSTRAINT [SelecAntecPatolog_idExamMed_fkey] FOREIGN KEY ([idExamMed]) REFERENCES [dbo].[ExamenMedico]([idExamMed]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SelecAntecPatolog] ADD CONSTRAINT [SelecAntecPatolog_idAntecPatolog_fkey] FOREIGN KEY ([idAntecPatolog]) REFERENCES [dbo].[AntecPatolog]([idAntecPatolog]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AntecFam] ADD CONSTRAINT [AntecFam_idExamMed_fkey] FOREIGN KEY ([idExamMed]) REFERENCES [dbo].[ExamenMedico]([idExamMed]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ExploracionFisica] ADD CONSTRAINT [ExploracionFisica_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[EntrevistaInicial] ADD CONSTRAINT [EntrevistaInicial_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
