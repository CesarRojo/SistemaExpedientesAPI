BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[EntrevistaInicial] DROP CONSTRAINT [EntrevistaInicial_fecha_df];

-- CreateTable
CREATE TABLE [dbo].[Extras] (
    [idExtras] INT NOT NULL IDENTITY(1,1),
    [idFolio] INT NOT NULL,
    [vioVideos] BIT NOT NULL CONSTRAINT [Extras_vioVideos_df] DEFAULT 0,
    CONSTRAINT [Extras_pkey] PRIMARY KEY CLUSTERED ([idExtras]),
    CONSTRAINT [Extras_idFolio_key] UNIQUE NONCLUSTERED ([idFolio])
);

-- AddForeignKey
ALTER TABLE [dbo].[Extras] ADD CONSTRAINT [Extras_idFolio_fkey] FOREIGN KEY ([idFolio]) REFERENCES [dbo].[Folio]([idFolio]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
