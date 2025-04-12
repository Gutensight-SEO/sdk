/** @format */
import { FC, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Alert,
  Link,
  Stack,
  useTheme
} from '@mui/material';
import { 
  LocationOn, 
  Phone, 
  Email,
  Send 
} from '@mui/icons-material';
import emailjs from "@emailjs/browser";

const ContactPage: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const theme = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.send(
        import.meta.env.VITE_YOUR_SERVICE_ID,    // Service ID 
        import.meta.env.VITE_YOUR_TEMPLATE_ID,   // Template ID 
        formData,
        import.meta.env.VITE_YOUR_PUBLIC_KEY     // Public Key 
      );
      setSubmitted(true);
      setError(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Failed to send email:', err);
      setError(true);
      setSubmitted(false);
    }
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      {/* <gutensight-title>Contact GutenSight Support | SEO Help Center</gutensight-title>
      <gutensight-description>Get technical support, sales inquiries, and SEO consulting from the GutenSight team. Reach out via form, email, or phone.</gutensight-description>
      <gutensight-keywords>contact, support, help, technical assistance</gutensight-keywords>
      <gutensight-changefreq>monthly</gutensight-changefreq> */}

      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Contact Our Team
          </Typography>
          
          <Typography variant="h5" color="text.secondary" mb={6}>
            We're here to help with your SEO journey
          </Typography>

          <Grid container spacing={8}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              {submitted && (
                <Alert severity="success" sx={{ mb: 4 }}>
                  Your message has been sent successfully!
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      variant="outlined"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      variant="outlined"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      variant="outlined"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    {submitted && (
                      <Alert severity="success" sx={{ mb: 4 }}>
                        Your message has been sent successfully!
                      </Alert>
                    )}
                    {error && (
                      <Alert severity="error" sx={{ mb: 4 }}>
                        Failed to send message. Please try again.
                      </Alert>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={<Send />}
                      sx={{ py: 1.5, px: 4 }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                p: 4,
                height: '100%'
              }}>
                <Typography variant="h3" component="h2" gutterBottom mb={4}>
                  Contact Information
                </Typography>

                <Stack spacing={4}>
                  <Box>
                    <Typography variant="h4" component="h3" gutterBottom>
                      <LocationOn color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Headquarters
                    </Typography>
                    <Typography>
                      Altruva Group<br />
                      123 SEO Innovation Blvd.<br />
                      San Francisco, CA 94107<br />
                      United States
                    </Typography>
                    <Link href="#" mt={1} display="block">
                      View on Map
                    </Link>
                  </Box>

                  <Box>
                    <Typography variant="h4" component="h3" gutterBottom>
                      <Phone color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Phone
                    </Typography>
                    <Typography>
                      Support: +1 (555) 123-4567<br />
                      Sales: +1 (555) 765-4321
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="h4" component="h3" gutterBottom>
                      <Email color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
                      Email
                    </Typography>
                    <Typography>
                      Support: <Link href="mailto:support@gutensight.com">support@gutensight.com</Link><br />
                      Sales: <Link href="mailto:sales@gutensight.com">sales@gutensight.com</Link>
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          </Grid>

          {/* Map Section */}
          <Box mt={8} sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: theme.shadows[2]
          }}>
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.6344755828854!2d-122.406744584685!3d37.78301797975939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d10af6e51%3A0x1122879c36e6d3aa!2sAltruva%20Group!5e0!3m2!1sen!2sus!4v1629786780514!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ContactPage;