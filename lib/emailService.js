import nodemailer from 'nodemailer';
// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};
// Email template for new project notification to freelancers
const getNewProjectEmailTemplate = (project) => {
  return {
    subject: `🚀 New Project Posted: ${project.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .project-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .badge { display: inline-block; padding: 5px 10px; background: #667eea; color: white; border-radius: 5px; font-size: 12px; margin: 5px 5px 5px 0; }
          .budget { font-size: 24px; color: #667eea; font-weight: bold; }
          .btn { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💼 New Project Available!</h1>
          </div>
          <div class="content">
            <p>Hi there! 👋</p>
            <p>A new project has been posted that might interest you:</p>
            
            <div class="project-card">
              <h2>${project.title}</h2>
              <p>${project.description}</p>
              
              <div style="margin: 15px 0;">
                <strong>Category:</strong> <span class="badge">${project.category}</span>
              </div>
              
              ${project.skills && project.skills.length > 0 ? `
                <div style="margin: 15px 0;">
                  <strong>Required Skills:</strong><br/>
                  ${project.skills.map(skill => `<span class="badge">${skill}</span>`).join('')}
                </div>
              ` : ''}
              
              <div style="margin: 15px 0;">
                <strong>Budget:</strong> <span class="budget">$${project.budget}</span>
              </div>
              
              ${project.milestones && project.milestones.length > 0 ? `
                <div style="margin: 15px 0;">
                  <strong>Milestones:</strong> ${project.milestones.length}
                </div>
              ` : ''}
            </div>
            
            <p>Don't miss this opportunity! Apply now to show your interest.</p>
            
            <center>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?view=project-detail&projectId=${project._id}" class="btn">
                View Project & Apply
              </a>
            </center>
            
            <div class="footer">
              <p>This is an automated notification from Paylance</p>
              <p>© ${new Date().getFullYear()} Paylance. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Project Posted: ${project.title}
      
      Description: ${project.description}
      Category: ${project.category}
      Budget: $${project.budget}
      ${project.skills && project.skills.length > 0 ? `Skills: ${project.skills.join(', ')}` : ''}
      
      Login to Paylance to view and apply for this project.
    `
  };
};
// Email template for new application notification to client
const getNewApplicationEmailTemplate = (project, freelancer, application) => {
  return {
    subject: `✨ New Application for: ${project.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .application-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .freelancer-info { display: flex; align-items: center; margin-bottom: 15px; }
          .avatar { width: 60px; height: 60px; border-radius: 50%; background: #667eea; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; margin-right: 15px; }
          .rating { color: #fbbf24; font-size: 18px; }
          .btn { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          .cover-letter { background: #f0f0f0; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; font-style: italic; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Application Received!</h1>
          </div>
          <div class="content">
            <p>Good news! 🎊</p>
            <p>A freelancer has applied for your project: <strong>${project.title}</strong></p>
            
            <div class="application-card">
              <div class="freelancer-info">
                <div class="avatar">${freelancer.name.charAt(0).toUpperCase()}</div>
                <div>
                  <h3 style="margin: 0;">${freelancer.name}</h3>
                  <div class="rating">
                    ${'⭐'.repeat(Math.round(freelancer.rating || 0))}
                    ${freelancer.rating ? `(${freelancer.rating}/5)` : 'New Freelancer'}
                  </div>
                  ${freelancer.completedProjects ? `
                    <p style="margin: 5px 0; color: #666;">
                      ✅ ${freelancer.completedProjects} Projects Completed
                    </p>
                  ` : ''}
                </div>
              </div>
              
              ${freelancer.skills && freelancer.skills.length > 0 ? `
                <div style="margin: 15px 0;">
                  <strong>Skills:</strong><br/>
                  ${freelancer.skills.map(skill => `<span style="display: inline-block; padding: 5px 10px; background: #e0e7ff; color: #667eea; border-radius: 5px; font-size: 12px; margin: 5px 5px 5px 0;">${skill}</span>`).join('')}
                </div>
              ` : ''}
              
              ${application.demoUrl ? `
                <div style="margin: 15px 0;">
                  <strong>Portfolio/Demo:</strong><br/>
                  <a href="${application.demoUrl}" style="color: #667eea;">${application.demoUrl}</a>
                </div>
              ` : ''}
              
              ${application.coverLetter ? `
                <div class="cover-letter">
                  <strong>Cover Letter:</strong><br/>
                  ${application.coverLetter}
                </div>
              ` : ''}
            </div>
            
            <p>Review the application and get in touch with the freelancer to discuss your project!</p>
            
            <center>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?view=project-detail&projectId=${project._id}" class="btn">
                Review Application
              </a>
            </center>
            
            <div class="footer">
              <p>This is an automated notification from Paylance</p>
              <p>© ${new Date().getFullYear()} Paylance. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Application for: ${project.title}
      
      Freelancer: ${freelancer.name}
      Rating: ${freelancer.rating || 'New'}
      Completed Projects: ${freelancer.completedProjects || 0}
      ${freelancer.skills && freelancer.skills.length > 0 ? `Skills: ${freelancer.skills.join(', ')}` : ''}
      
      ${application.demoUrl ? `Portfolio: ${application.demoUrl}` : ''}
      
      ${application.coverLetter ? `Cover Letter:\n${application.coverLetter}` : ''}
      
      Login to Paylance to review this application.
    `
  };
};
// Send email to all freelancers when a new project is posted
export const notifyFreelancersAboutNewProject = async (project) => {
  try {
    // This would be called from the API route and would receive the list of freelancers
    // For now, we'll export a function that can be called with the freelancer list
    console.log('Email notification prepared for new project:', project.title);
    return { success: true };
  }
  catch (error) {
    console.error('Error in notifyFreelancersAboutNewProject:', error);
    throw error;
  }
};
// Send email to specific recipients
export const sendEmail = async (to, subject, html, text) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"Paylance" <${process.env.SMTP_USER}>`,
      to: Array.isArray(to) ? to.join(',') : to,
      subject,
      html,
      text,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  }
  catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
// Send project notification to all freelancers
export const sendNewProjectNotification = async (project, freelancers) => {
  try {
    if (!freelancers || freelancers.length === 0) {
      console.log('No freelancers to notify');
      return { success: true, sent: 0 };
    }
    const emailTemplate = getNewProjectEmailTemplate(project);
    const freelancerEmails = freelancers.map(f => f.email).filter(Boolean);
    if (freelancerEmails.length === 0) {
      console.log('No valid freelancer emails found');
      return { success: true, sent: 0 };
    }
    // Send emails in batches to avoid rate limiting
    const batchSize = 50;
    let sentCount = 0;
    for (let i = 0; i < freelancerEmails.length; i += batchSize) {
      const batch = freelancerEmails.slice(i, i + batchSize);
      await sendEmail(batch, emailTemplate.subject, emailTemplate.html, emailTemplate.text);
      sentCount += batch.length;
    }
    console.log(`Sent new project notification to ${sentCount} freelancers`);
    return { success: true, sent: sentCount };
  }
  catch (error) {
    console.error('Error sending project notifications:', error);
    return { success: false, error: error.message };
  }
};
// Send application notification to client
export const sendNewApplicationNotification = async (project, client, freelancer, application) => {
  try {
    if (!client || !client.email) {
      console.log('No client email found');
      return { success: false, error: 'No client email' };
    }
    const emailTemplate = getNewApplicationEmailTemplate(project, freelancer, application);
    await sendEmail(client.email, emailTemplate.subject, emailTemplate.html, emailTemplate.text);
    console.log(`Sent application notification to client: ${client.email}`);
    return { success: true };
  }
  catch (error) {
    console.error('Error sending application notification:', error);
    return { success: false, error: error.message };
  }
};
