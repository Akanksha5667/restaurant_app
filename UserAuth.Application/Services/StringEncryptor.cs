using System.Security.Cryptography;
using System.Text;

namespace UserAuth.Application
{
    public class StringEncryptor
    {
        private readonly byte[] key;
        private readonly byte[] iv;

        public StringEncryptor(string keyString, string ivString)
        {
            key = SHA256.HashData(Encoding.UTF8.GetBytes(keyString));

            iv = Encoding.UTF8.GetBytes(ivString);
            if (iv.Length != 16)
            {
                Array.Resize(ref iv, 16); // Resize to 16 bytes (128 bits)
            }
        }

        public string Encrypt(string plainText)
        {
            using var aes = Aes.Create();
            aes.Key = key;
            aes.IV = iv;

            var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

            using var memoryStream = new MemoryStream();
            using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
            {
                using (var streamWriter = new StreamWriter(cryptoStream))
                {
                    streamWriter.Write(plainText);
                }
            }

            return Convert.ToBase64String(memoryStream.ToArray());
        }

        public string Decrypt(string cipherText)
        {
            using var aes = Aes.Create();
            aes.Key = key;
            aes.IV = iv;

            var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

            using var memoryStream = new MemoryStream(Convert.FromBase64String(cipherText));
            using var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
            using var streamReader = new StreamReader(cryptoStream);

            return streamReader.ReadToEnd();
        }
    }
}
