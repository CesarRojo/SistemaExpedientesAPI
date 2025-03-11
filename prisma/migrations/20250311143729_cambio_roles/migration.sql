/*
  Warnings:

  - You are about to drop the column `idRol` on the `Empleado` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Empleado] DROP CONSTRAINT [Empleado_idRol_fkey];

-- AlterTable
ALTER TABLE [dbo].[Empleado] DROP COLUMN [idRol];

-- CreateTable
CREATE TABLE [dbo].[EmpleadoRol] (
    [idEmpleadoRol] INT NOT NULL IDENTITY(1,1),
    [idEmpleado] INT NOT NULL,
    [idRol] INT NOT NULL,
    CONSTRAINT [EmpleadoRol_pkey] PRIMARY KEY CLUSTERED ([idEmpleadoRol]),
    CONSTRAINT [EmpleadoRol_idEmpleado_idRol_key] UNIQUE NONCLUSTERED ([idEmpleado],[idRol])
);

-- AddForeignKey
ALTER TABLE [dbo].[EmpleadoRol] ADD CONSTRAINT [EmpleadoRol_idEmpleado_fkey] FOREIGN KEY ([idEmpleado]) REFERENCES [dbo].[Empleado]([idEmpleado]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[EmpleadoRol] ADD CONSTRAINT [EmpleadoRol_idRol_fkey] FOREIGN KEY ([idRol]) REFERENCES [dbo].[Roles]([idRol]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
