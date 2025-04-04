BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Consentimiento] (
    [idConsentimiento] INT NOT NULL IDENTITY(1,1),
    [fecha] DATETIME2 NOT NULL CONSTRAINT [Consentimiento_fecha_df] DEFAULT CURRENT_TIMESTAMP,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [Consentimiento_pkey] PRIMARY KEY CLUSTERED ([idConsentimiento]),
    CONSTRAINT [Consentimiento_idUsuario_key] UNIQUE NONCLUSTERED ([idUsuario])
);

-- AddForeignKey
ALTER TABLE [dbo].[Consentimiento] ADD CONSTRAINT [Consentimiento_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
