using System.ComponentModel.DataAnnotations;

namespace RegressionMatrix.Models
{
    public class TestDeviceUserType
    {
        [Key]
        [Required]
        public string TestSuiteWithDeviceAndUserTypeId { get; set; }
        [Required]
        public string RegressionTestSuiteId { get; set; }
        [Required]
        public string DeviceId { get; set; }
        [Required]
        public string UserTypeId { get; set; }
        [Required]
        public string ProductReleaseId { get; set; }
        [Required]
        public string DeviceCount { get; set; }
    }
}