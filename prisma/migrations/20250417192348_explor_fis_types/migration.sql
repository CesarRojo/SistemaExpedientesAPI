BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [enProceso] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[EntrevistaInicial] ALTER COLUMN [preparado] NVARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [peso] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [talla] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [temperatura] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [FR] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [FC] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [TA] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [finkelstein] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [tinel] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [phalen] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [comprension] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [visionLejos] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [visionCerca] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [daltonismo] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [OI] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [OD] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [calificacion] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [lesionOcular] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [lesionOido] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [bocaDienEnc] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [torax] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [columVert] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ExploracionFisica] ALTER COLUMN [extremidades] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
