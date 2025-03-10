/*
  Warnings:

  - A unique constraint covering the columns `[noReloj]` on the table `Empleado` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Empleado] ADD CONSTRAINT [Empleado_noReloj_key] UNIQUE NONCLUSTERED ([noReloj]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
