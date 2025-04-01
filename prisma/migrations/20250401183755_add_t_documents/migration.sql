BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Documento] (
    [idDocumento] INT NOT NULL IDENTITY(1,1),
    [idUsuario] INT NOT NULL,
    [filename] NVARCHAR(1000) NOT NULL,
    [path] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Documento_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Documento_pkey] PRIMARY KEY CLUSTERED ([idDocumento])
);

-- AddForeignKey
ALTER TABLE [dbo].[Documento] ADD CONSTRAINT [Documento_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuario]([idUsuario]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
