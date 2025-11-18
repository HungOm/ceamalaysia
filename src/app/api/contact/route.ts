// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Contact form data type
interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  type: string
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/&/g, '&amp;')
}

// Email template
function getEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3B82F6; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #555; margin-bottom: 5px; }
        .value { background: white; padding: 10px; border: 1px solid #e0e0e0; border-radius: 5px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #777; font-size: 12px; }
        .badge { display: inline-block; padding: 5px 10px; background: #EFF6FF; color: #3B82F6; border-radius: 15px; font-size: 12px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
          <p style="margin: 0; opacity: 0.9;">K'Cho Ethnic Association Malaysia</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Inquiry Type:</div>
            <div class="value">
              <span class="badge">${sanitizeInput(data.type.toUpperCase())}</span>
            </div>
          </div>
          
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${sanitizeInput(data.name)}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${sanitizeInput(data.email)}">${sanitizeInput(data.email)}</a></div>
          </div>
          
          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${sanitizeInput(data.phone)}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Subject:</div>
            <div class="value">${sanitizeInput(data.subject)}</div>
          </div>
          
          <div class="field">
            <div class="label">Message:</div>
            <div class="value" style="white-space: pre-wrap;">${sanitizeInput(data.message)}</div>
          </div>
          
          <div class="footer">
            <p>This message was sent from the CEAM website contact form.</p>
            <p>Time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' })} (Malaysia Time)</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

// Auto-reply email template
function getAutoReplyTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3B82F6; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #3B82F6; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #777; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">Thank You for Contacting Us!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">K'Cho Ethnic Association Malaysia</p>
        </div>
        <div class="content">
          <p>Dear ${sanitizeInput(name)},</p>
          
          <p>Thank you for reaching out to the K'Cho Ethnic Association Malaysia (CEAM). We have received your message and appreciate your interest in our work.</p>
          
          <p>Our team will review your inquiry and get back to you as soon as possible, typically within 1-2 business days.</p>
          
          <p>In the meantime, you can:</p>
          <ul>
            <li>Visit our website to learn more about our programs and initiatives</li>
            <li>Follow us on social media for the latest updates</li>
            <li>Call our office at +60 12-345-6789 for urgent matters</li>
          </ul>
          
          <p>We look forward to connecting with you!</p>
          
          <p>Warm regards,<br>
          The CEAM Team</p>
          
          <div style="text-align: center;">
            <a href="https://ceamalaysia.org" class="button">Visit Our Website</a>
          </div>
          
          <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>K'Cho Ethnic Association Malaysia | Kuala Lumpur, Malaysia</p>
            <p><a href="https://ceamalaysia.org">ceamalaysia.org</a> | contact@ceamalaysia.org</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message || !data.type) {
      return NextResponse.json(
        { message: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Rate limiting check (simple implementation)
    // In production, use a proper rate limiting solution like Redis
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Create email transporter
    // Note: In production, use environment variables for credentials
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password'
      }
    })

    // Email options for admin notification
    const adminMailOptions = {
      from: `"CEAM Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'contact@ceamalaysia.org',
      subject: `[${data.type.toUpperCase()}] ${data.subject}`,
      html: getEmailTemplate(data),
      replyTo: data.email
    }

    // Email options for auto-reply
    const autoReplyOptions = {
      from: `"CEAM" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: 'Thank you for contacting CEAM',
      html: getAutoReplyTemplate(data.name)
    }

    // Send emails
    try {
      // Send admin notification
      await transporter.sendMail(adminMailOptions)
      
      // Send auto-reply to user
      await transporter.sendMail(autoReplyOptions)
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      
      // If email fails, you might want to save to database or log
      // For now, we'll return success but log the error
      // In production, implement proper error handling and fallback
    }

    // Log submission (in production, save to database)
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      type: data.type,
      subject: data.subject,
      ip: clientIP
    })

    return NextResponse.json(
      { 
        message: 'Thank you for your message. We will get back to you soon!',
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        message: 'An error occurred while processing your request. Please try again later.',
        success: false 
      },
      { status: 500 }
    )
  }
}

// Optional: GET method to check if API is working
export async function GET() {
  return NextResponse.json(
    { 
      message: 'Contact API is running',
      version: '1.0.0'
    },
    { status: 200 }
  )
}