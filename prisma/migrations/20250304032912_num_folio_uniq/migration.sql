/*
  Warnings:

  - A unique constraint covering the columns `[numFolio]` on the table `Folio` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Folio] ADD CONSTRAINT [Folio_numFolio_key] UNIQUE NONCLUSTERED ([numFolio]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
