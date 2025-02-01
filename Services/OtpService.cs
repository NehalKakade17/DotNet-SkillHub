using OtpNet;

namespace SkillHub.Services
{
    public class OtpService
    {
        private const int KeySize = 20;
        private readonly string _secretKey;

        // Initialize with your user-specific secret key (for example from a DB)
        public OtpService()
        {
            _secretKey = "7b0ad3a771f47c05bf1397455407432463ca6ec7d93f65bd590e1d756e7827d05aa3352c0279ff7e7111eddc305b8c8fa47ecc5ed816b58b996fc21f0f199e4ea43025ccfa0c2a3e9fc9838986d814ba3858027bf74a8bb16e23dd36b3226c6caef97243d73b2d3cd52a3f74bef6eacb49cd2df02f18286f6c14e3a3ea97f6b949a05e5e9de4b6acc94206fa125906c52010a4cc290b1fe4f11f4c2e192122dea0005c45027e192b5057dda47fa81ea6debb4272b464003af5dff647b1d887742ff2a44d090312c7a7ef23a017f5f9620e0dbfe2333621e60bd5b7a74bc700bcc524bb2224975e08ad6cb4a040a1908fa0dda50987b68840874addec402191c5";  // Replace with actual secret key logic per user
        }

        // Generate OTP
        public string GenerateOtp()
        {
            var key = new byte[KeySize];
            using (var rng = new System.Security.Cryptography.RNGCryptoServiceProvider())
            {
                rng.GetBytes(key);
            }
            var base32Key = Base32Encoding.ToString(key);
            Console.WriteLine($"Generated Base32 Key: {base32Key}");

            // Now create the OTP from the Base32 key (you can pass this key to your OTP generator)
            var totp = new Totp(key);
            return totp.ComputeTotp();
            
        }

        // Validate OTP: Compares the OTP entered by the user to the generated OTP
        public bool ValidateOtp(string otp)
        {
            try
            {
                otp = otp.Trim();
                // Convert Base32 encoded secret back to bytes
                var keyBytes = Base32Encoding.ToBytes(_secretKey);

                // Validate OTP against the secret key
                var totp = new Totp(keyBytes);
                bool isValid = totp.VerifyTotp(otp, out long timeWindow);

                // Log time window for debugging
                Console.WriteLine($"Time Window: {timeWindow}");
                return isValid;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error validating OTP: {ex.Message}");
                return false;
            }
        }
    }
}
