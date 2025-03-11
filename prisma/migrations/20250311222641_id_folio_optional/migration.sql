BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Empleado] DROP CONSTRAINT [Empleado_idFolio_fkey];

-- AlterTable
ALTER TABLE [dbo].[Empleado] ALTER COLUMN [idFolio] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Empleado] ADD CONSTRAINT [Empleado_idFolio_fkey] FOREIGN KEY ([idFolio]) REFERENCES [dbo].[Folio]([idFolio]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
