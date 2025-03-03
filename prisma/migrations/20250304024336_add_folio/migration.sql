BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Folio] (
    [id] INT NOT NULL IDENTITY(1,1),
    [numFolio] INT NOT NULL,
    CONSTRAINT [Folio_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
