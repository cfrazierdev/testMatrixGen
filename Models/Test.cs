using System.ComponentModel.DataAnnotations;

namespace RegressionMatrix.Models
{
    public class Test
    {
        [Key]
        [Required]
        public double RegressionTestSuiteId { get; set; }
        [Required]
        public string RegressionTestSuiteName { get; set; }
        [Required]
        public double RiskLevelId { get; set; }
        [Required]
        public double IsCore { get; set; }
        [Required]
        public double IsDeviceBlind { get; set; }
        [Required]
        public double IsUserTypeBlind { get; set; }
        [Required]
        public double OmitFromMobile { get; set; }
    }
}