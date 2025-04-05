/*
  Warnings:

  - Added the required column `enProceso` to the `EntrevistaInicial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preparado` to the `EntrevistaInicial` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[EntrevistaInicial] ADD [enProceso] NVARCHAR(1000) NOT NULL,
[preparado] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
