BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [image] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [encinte] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [tricky] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [artesanal] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [comprension] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [vista] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [calificacion] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [comentarios] NVARCHAR(1000) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
