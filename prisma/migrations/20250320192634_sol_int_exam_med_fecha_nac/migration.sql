/*
  Warnings:

  - You are about to drop the column `fechaNac` on the `ExamenMedico` table. All the data in the column will be lost.
  - You are about to drop the column `fechaNac` on the `SolicitudInterna` table. All the data in the column will be lost.
  - Added the required column `fechaNac` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ExamenMedico] DROP COLUMN [fechaNac];

-- AlterTable
ALTER TABLE [dbo].[SolicitudInterna] DROP COLUMN [fechaNac];

-- AlterTable
ALTER TABLE [dbo].[Usuario] ADD [fechaNac] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
