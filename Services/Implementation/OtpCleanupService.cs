using SkillHub.Repositories.Interfaces;

namespace SkillHub.Services.Implementation
{
    public class OtpCleanupService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly TimeSpan _interval = TimeSpan.FromHours(1);

        public OtpCleanupService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {

                await DeleteExpiredOtpsAsync();

                await Task.Delay(_interval, stoppingToken);
            }
        }

        private async Task DeleteExpiredOtpsAsync()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var otpRepository = scope.ServiceProvider.GetRequiredService<IOtpRepository>();

                await otpRepository.TruncateOtpTableAsync();
            }
        }
    }
}
