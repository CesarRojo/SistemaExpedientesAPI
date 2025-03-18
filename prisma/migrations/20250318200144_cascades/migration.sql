BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[AntecFam] DROP CONSTRAINT [AntecFam_idExamMed_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[DatosFam] DROP CONSTRAINT [DatosFam_idSolInt_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Empleado] DROP CONSTRAINT [Empleado_idFolio_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[EmpleadoRol] DROP CONSTRAINT [EmpleadoRol_idEmpleado_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[EmpleadoRol] DROP CONSTRAINT [EmpleadoRol_idRol_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[EntrevistaInicial] DROP CONSTRAINT [EntrevistaInicial_idUsuario_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ExamenMedico] DROP CONSTRAINT [ExamenMedico_idUsuario_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ExploracionFisica] DROP CONSTRAINT [ExploracionFisica_idUsuario_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Extras] DROP CONSTRAINT [Extras_idFolio_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[SelecAntecPatolog] DROP CONSTRAINT [SelecAntecPatolog_idAntecPatolog_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[SelecAntecPatolog] DROP CONSTRAINT [SelecAntecPatolog_idExamMed_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[SolicitudInterna] DROP CONSTRAINT [SolicitudInterna_idUsuario_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Usuario] DROP CONSTRAINT [Usuario_idFolio_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[Extras] ADD CONSTRAINT [Extras_idFolio_fkey] FOREIGN KEY ([idFolio]) REFERENCES [dbo].[Folio]([idFolio]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Empleado] ADD CONSTRAINT [Empleado_idFolio_fkey] FOREIGN KEY ([idFolio]) REFERENCES [dbo].[Folio]([idFolio]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[EmpleadoRol] ADD CONSTRAINT [EmpleadoRol_idEmpleado_fkey] FOREIGN KEY ([idEmpleado]) REFERENCES [dbo].[Empleado]([idEmpleado]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[EmpleadoRol] ADD CONSTRAINT [EmpleadoRol_idRol_fkey] FOREIGN KEY ([idRol]) REFERENCES [dbo].[Roles]([idRol]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Usuario] ADD CONSTRAINT [Usuario_idFolio_fkey] FOREIGN KEY ([idFolio]) REFERENCES [dbo].[Folio]([idFolio]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SolicitudInterna] ADD CONSTRAINT [SolicitudInterna_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DatosFam] ADD CONSTRAINT [DatosFam_idSolInt_fkey] FOREIGN KEY ([idSolInt]) REFERENCES [dbo].[SolicitudInterna]([idSolInt]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ExamenMedico] ADD CONSTRAINT [ExamenMedico_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SelecAntecPatolog] ADD CONSTRAINT [SelecAntecPatolog_idExamMed_fkey] FOREIGN KEY ([idExamMed]) REFERENCES [dbo].[ExamenMedico]([idExamMed]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SelecAntecPatolog] ADD CONSTRAINT [SelecAntecPatolog_idAntecPatolog_fkey] FOREIGN KEY ([idAntecPatolog]) REFERENCES [dbo].[AntecPatolog]([idAntecPatolog]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AntecFam] ADD CONSTRAINT [AntecFam_idExamMed_fkey] FOREIGN KEY ([idExamMed]) REFERENCES [dbo].[ExamenMedico]([idExamMed]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ExploracionFisica] ADD CONSTRAINT [ExploracionFisica_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[EntrevistaInicial] ADD CONSTRAINT [EntrevistaInicial_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
