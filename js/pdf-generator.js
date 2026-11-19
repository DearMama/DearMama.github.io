// PDF Resume Generator - v2.0
// A comprehensive redesign for a modern, professional, and visually appealing resume.

// Load jsPDF library dynamically if not already loaded
function loadJsPDF() {
    return new Promise((resolve, reject) => {
        if (window.jspdf) {
            resolve(window.jspdf.jsPDF);
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => resolve(window.jspdf.jsPDF);
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// --- PDF Design System ---
const pdfTheme = {
    colors: {
        primary: '#000000', // Pure black for text
        secondary: '#333333', // Dark gray for secondary text
        accent: '#666666', // Medium gray for subtle elements
        line: '#E0E0E0', // Light gray for lines
        white: '#FFFFFF'
    },
    fonts: {
        name: { family: 'helvetica', style: 'bold', size: 24 },
        title: { family: 'helvetica', style: 'normal', size: 11 },
        contact: { family: 'helvetica', style: 'normal', size: 9 },
        sectionTitle: { family: 'helvetica', style: 'bold', size: 11 },
        jobTitle: { family: 'helvetica', style: 'bold', size: 10 },
        body: { family: 'helvetica', style: 'normal', size: 9 },
        small: { family: 'helvetica', style: 'normal', size: 8 },
        italic: { family: 'helvetica', style: 'italic', size: 9 }
    },
    layout: {
        margin: 25,
        lineHeight: 4.5,
        sectionSpacing: 8,
    }
};

// --- PDF Generation Logic ---

async function generateResumePDF(contentData) {
    try {
        showNotification('Generating your new resume...', 'info');
        
        const jsPDF = await loadJsPDF();
        const doc = new jsPDF('p', 'mm', 'a4');
        const { personal, hero, about, projects, resume } = contentData;
        const { colors, fonts, layout } = pdfTheme;
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let y = layout.margin;

        // --- PDF Helper Functions ---
        
        const checkPageBreak = (requiredSpace) => {
            if (y + requiredSpace > pageHeight - layout.margin) {
                doc.addPage();
                y = layout.margin;
            }
        };

        const addWrappedText = (text, options) => {
            const { x, font, color, maxWidth, lineHeight } = options;
            doc.setFont(font.family, font.style);
            doc.setFontSize(font.size);
            doc.setTextColor(color);
            const lines = doc.splitTextToSize(text, maxWidth);
            doc.text(lines, x, y);
            return (lines.length * (lineHeight || layout.lineHeight));
        };

        const addSection = (title, startY) => {
            y = startY || y;
            checkPageBreak(16); // more space for better grouping
            doc.setFont(fonts.sectionTitle.family, fonts.sectionTitle.style);
            doc.setFontSize(fonts.sectionTitle.size);
            doc.setTextColor(colors.primary);
            doc.text(title.toUpperCase(), layout.margin, y);
            y += layout.lineHeight * 1.7; // more space after title
            doc.setDrawColor(colors.line);
            doc.setLineWidth(0.4);
            doc.line(layout.margin, y, pageWidth - layout.margin, y);
            y += 5; // more space after line
        };

        // Helper: check if enough space for a block, else page break before block
        const ensureBlockFits = (minHeight) => {
            if (y + minHeight > pageHeight - layout.margin) {
                doc.addPage();
                y = layout.margin;
            }
        };

        // Helper: estimate height for a job block (title, company, achievements)
        const estimateJobBlockHeight = (job) => {
            let h = 0;
            h += layout.lineHeight * 1.5; // title/period
            h += layout.lineHeight * 1.7; // company/location
            h += ((job.achievements || []).length) * (layout.lineHeight * 1.1 + 2.5);
            h += 10; // bottom margin between jobs
            return h;
        };

        // --- PDF Structure ---

        // 1. Header Section - Centered
        const nameWidth = doc.getTextWidth(personal.name);
        const centerX = pageWidth / 2;
        
        doc.setTextColor(colors.primary);
        doc.setFont(fonts.name.family, fonts.name.style);
        doc.setFontSize(fonts.name.size);
        doc.text(personal.name.toUpperCase(), centerX, y, { align: 'center' });
        y += 6;

        doc.setFont(fonts.title.family, fonts.title.style);
        doc.setFontSize(fonts.title.size);
        doc.setTextColor(colors.primary);
        doc.text(personal.title, centerX, y, { align: 'center' });
        y += 5;

        const contactInfo = [personal.phone, personal.email, personal.githubUrl].filter(Boolean).join(' | ');
        doc.setFont(fonts.contact.family, fonts.contact.style);
        doc.setFontSize(fonts.contact.size);
        doc.setTextColor(colors.secondary);
        doc.text(contactInfo, centerX, y, { align: 'center' });
        y += 12;

        // Horizontal line after header
        doc.setDrawColor(colors.line);
        doc.setLineWidth(0.5);
        doc.line(layout.margin, y, pageWidth - layout.margin, y);
        y += 10;

        // 2. Profile/Summary Section
        addSection('Profile');
        const summary = (resume?.objective || hero.lede).replace(/<[^>]+>/g, '');
        y += addWrappedText(summary, { x: layout.margin, font: fonts.body, color: colors.primary, maxWidth: pageWidth - (layout.margin * 2), lineHeight: 4 });
        y += layout.sectionSpacing;

        // 3. Professional Experience
        addSection('Professional Experience');
        resume.experience.forEach((job, index) => {
            const jobBlockHeight = estimateJobBlockHeight(job);
            ensureBlockFits(jobBlockHeight);
            // Job title and period on same line
            doc.setFont(fonts.jobTitle.family, fonts.jobTitle.style);
            doc.setFontSize(fonts.jobTitle.size);
            doc.setTextColor(colors.primary);
            doc.text(job.title.toUpperCase(), layout.margin, y);
            doc.setFont(fonts.small.family, fonts.small.style);
            doc.setFontSize(fonts.small.size);
            doc.setTextColor(colors.secondary);
            if (job.period) doc.text(job.period, pageWidth - layout.margin, y, { align: 'right' });
            y += layout.lineHeight * 1.5;
            // Company and location
            doc.setFont(fonts.body.family, fonts.body.style);
            doc.setFontSize(fonts.body.size);
            doc.setTextColor(colors.secondary);
            const place = [job.company, job.location].filter(Boolean).join(', ');
            doc.text(place, layout.margin, y);
            y += layout.lineHeight * 1.7;
            // Achievements
            (job.achievements || []).forEach(achievement => {
                checkPageBreak(10);
                const bullet = '•';
                const bulletWidth = 4;
                doc.setFont(fonts.body.family, fonts.body.style);
                doc.setFontSize(fonts.body.size);
                doc.setTextColor(colors.primary);
                doc.text(bullet, layout.margin, y);
                const textHeight = addWrappedText(achievement, {
                    x: layout.margin + bulletWidth,
                    font: fonts.body,
                    color: colors.primary,
                    maxWidth: pageWidth - (layout.margin * 2) - bulletWidth,
                    lineHeight: 4
                });
                y += textHeight + 2.5;
            });
            if (index < resume.experience.length - 1) {
                y += 10;
            }
        });
        y += layout.sectionSpacing + 4;
        // 5. Education Section
        addSection('Education');
        resume.education.forEach((edu, index) => {
            ensureBlockFits(18);
            
            // Institution name and period
            doc.setFont(fonts.jobTitle.family, fonts.jobTitle.style);
            doc.setFontSize(fonts.jobTitle.size);
            doc.setTextColor(colors.primary);
            doc.text(edu.institution.toUpperCase(), layout.margin, y);
            
            doc.setFont(fonts.small.family, fonts.small.style);
            doc.setFontSize(fonts.small.size);
            doc.setTextColor(colors.secondary);
            doc.text(edu.period, pageWidth - layout.margin, y, { align: 'right' });
            y += layout.lineHeight * 1.5;

            // Degree
            doc.setFont(fonts.body.family, fonts.body.style);
            doc.setFontSize(fonts.body.size);
            doc.setTextColor(colors.secondary);
            doc.text(edu.degree, layout.margin, y);
            y += layout.lineHeight * 1.5;
            if (edu.note) {
                y += addWrappedText(edu.note, {
                    x: layout.margin,
                    font: fonts.body,
                    color: colors.primary,
                    maxWidth: pageWidth - (layout.margin * 2),
                    lineHeight: 4
                });
            }
            if (index < resume.education.length - 1) {
                y += layout.lineHeight * 2.5;
            } else {
                y += layout.lineHeight * 2;
            }
        });
        y += layout.sectionSpacing + 4;

        if (resume.certifications && resume.certifications.length > 0) {
            addSection('Certifications');
            resume.certifications.forEach((cert) => {
                ensureBlockFits(8);
                doc.setFont(fonts.body.family, fonts.body.style);
                doc.setFontSize(fonts.body.size);
                doc.setTextColor(colors.primary);
                doc.text('•  ' + cert, layout.margin, y);
                y += layout.lineHeight * 1.3;
            });
            y += layout.sectionSpacing;
        }

        // 6. Skills and Interests Section
        addSection('Skills');
        const skillNames = (resume.skills && resume.skills.length)
            ? resume.skills
            : (about.skills || []).map((skill) => skill.title);
        if (skillNames.length) {
            y += addWrappedText(skillNames.join('  ·  '), {
                x: layout.margin,
                font: fonts.body,
                color: colors.primary,
                maxWidth: pageWidth - (layout.margin * 2),
                lineHeight: 4.5
            });
            y += 4;
        }
        if (resume.interests && resume.interests.length) {
            y += 4;
            doc.setFont(fonts.jobTitle.family, fonts.jobTitle.style);
            doc.setFontSize(fonts.small.size);
            doc.setTextColor(colors.secondary);
            doc.text('INTERESTS', layout.margin, y);
            y += layout.lineHeight * 1.3;
            y += addWrappedText(resume.interests.join('  ·  '), {
                x: layout.margin,
                font: fonts.body,
                color: colors.primary,
                maxWidth: pageWidth - (layout.margin * 2),
                lineHeight: 4.5
            });
        }
        y += layout.sectionSpacing;
        // 7. Reference Section (if applicable)
        if (resume.references && resume.references.length > 0) {
            addSection('Reference');
            resume.references.forEach(ref => {
                ensureBlockFits(16);
                doc.setFont(fonts.jobTitle.family, fonts.jobTitle.style);
                doc.setFontSize(fonts.jobTitle.size);
                doc.setTextColor(colors.primary);
                doc.text(ref.name, layout.margin, y);
                y += layout.lineHeight * 1.5;

                doc.setFont(fonts.body.family, fonts.body.style);
                doc.setFontSize(fonts.body.size);
                doc.setTextColor(colors.secondary);
                doc.text(ref.title, layout.margin, y);
                y += layout.lineHeight * 2;
            });
        }

        // --- Save the PDF ---
        const fileName = `${personal.name.replace(/\s+/g, '_')}_Resume.pdf`;
        doc.save(fileName);
        
        showNotification('Your new resume has been downloaded!', 'success');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Error generating resume. Please try again.', 'error');
    }
}

// Notification helper function
function showNotification(message, type) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // You can enhance this with actual UI notifications
}

function resumePlainText(contentData) {
    const { personal, resume } = contentData;
    const lines = [
        personal.name,
        personal.title,
        [personal.email, personal.phone, personal.location, personal.githubUrl].filter(Boolean).join(' | '),
        '',
        'PROFILE',
        resume.objective || '',
        '',
        'EXPERIENCE'
    ];
    (resume.experience || []).forEach((job) => {
        lines.push(job.period ? `${job.title} — ${job.period}` : job.title);
        lines.push([job.company, job.location].filter(Boolean).join(', '));
        (job.achievements || []).forEach((item) => lines.push(`- ${item}`));
        lines.push('');
    });
    lines.push('EDUCATION');
    (resume.education || []).forEach((edu) => {
        lines.push(`${edu.institution} — ${edu.period}`);
        lines.push(edu.degree);
        if (edu.note) lines.push(edu.note);
        lines.push('');
    });
    if (resume.certifications && resume.certifications.length) {
        lines.push('CERTIFICATIONS');
        resume.certifications.forEach((cert) => lines.push(`- ${cert}`));
        lines.push('');
    }
    if (resume.skills && resume.skills.length) {
        lines.push('SKILLS');
        lines.push(resume.skills.join(', '));
        lines.push('');
    }
    if (resume.interests && resume.interests.length) {
        lines.push('INTERESTS');
        lines.push(resume.interests.join(', '));
    }
    return lines.join('\n').trim();
}

// Resume preview: readable on the page, with copy and PDF download.
const resumePreview = {
    show(contentData) {
        this.close();
        const { personal, resume } = contentData;

        const modalHTML = `
            <div id="resumePreviewModal" class="resume-preview-modal">
                <div class="resume-preview-container" role="dialog" aria-modal="true" aria-labelledby="resumePreviewTitle">
                    <div class="resume-preview-header">
                        <h2 id="resumePreviewTitle">Resume</h2>
                        <button class="close-preview" type="button" aria-label="Close">Close</button>
                    </div>
                    <div class="resume-preview-content" id="resumeSheet">
                        ${this.renderHeader(personal)}
                        ${this.renderSection('Profile', `<p>${resume.objective || ''}</p>`)}
                        ${this.renderExperience(resume)}
                        ${this.renderEducation(resume)}
                        ${this.renderList('Certifications', resume.certifications)}
                        ${this.renderList('Skills', resume.skills)}
                        ${this.renderList('Interests', resume.interests)}
                    </div>
                    <div class="resume-preview-footer">
                        <button class="resume-action resume-action-ghost close-preview" type="button">Close</button>
                        <button class="resume-action resume-action-ghost" id="copyResumeBtn" type="button">Copy</button>
                        <button class="resume-action resume-action-primary" id="downloadPdfBtn" type="button">Download PDF</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.addEventListeners(contentData);
        document.body.style.overflow = 'hidden';
    },

    renderHeader(personal) {
        const contactInfo = [personal.email, personal.phone, personal.location, 'github.com/' + (personal.github || '')].filter(Boolean).join('  ·  ');
        return `
            <div class="preview-section preview-header-section">
                <h1>${personal.name}</h1>
                <p class="preview-title">${personal.title}</p>
                <p class="preview-contact">${contactInfo}</p>
            </div>
        `;
    },

    renderSection(title, content) {
        return `
            <div class="preview-section">
                <h2 class="preview-heading">${title}</h2>
                <div class="preview-section-content">
                    ${content}
                </div>
            </div>
        `;
    },

    renderExperience(resume) {
        if (!resume.experience || resume.experience.length === 0) return '';
        const content = resume.experience.map((job) => `
            <div class="preview-job">
                <div class="preview-job-header">
                    <strong>${job.title}</strong>
                    <span>${job.period || ''}</span>
                </div>
                <div class="preview-company">${[job.company, job.location].filter(Boolean).join(', ')}</div>
                ${(job.achievements || []).length ? `<ul class="preview-achievements">${job.achievements.map((ach) => `<li>${ach}</li>`).join('')}</ul>` : ''}
            </div>
        `).join('');
        return this.renderSection('Experience', content);
    },

    renderEducation(resume) {
        if (!resume.education || resume.education.length === 0) return '';
        const content = resume.education.map((edu) => `
            <div class="preview-job">
                <div class="preview-job-header">
                    <strong>${edu.institution}</strong>
                    <span>${edu.period || ''}</span>
                </div>
                <div class="preview-company">${edu.degree}</div>
                ${edu.note ? `<p>${edu.note}</p>` : ''}
            </div>
        `).join('');
        return this.renderSection('Education', content);
    },

    renderList(title, items) {
        if (!items || !items.length) return '';
        return this.renderSection(title, `<p>${items.join('  ·  ')}</p>`);
    },

    addEventListeners(contentData) {
        const modal = document.getElementById('resumePreviewModal');
        modal.querySelectorAll('.close-preview').forEach((btn) => btn.addEventListener('click', () => this.close()));
        modal.addEventListener('click', (event) => {
            if (event.target === modal) this.close();
        });
        document.getElementById('downloadPdfBtn').addEventListener('click', () => generateResumePDF(contentData));
        document.getElementById('copyResumeBtn').addEventListener('click', async (event) => {
            const button = event.currentTarget;
            const text = resumePlainText(contentData);
            try {
                await navigator.clipboard.writeText(text);
                button.textContent = 'Copied';
            } catch (error) {
                const area = document.createElement('textarea');
                area.value = text;
                area.setAttribute('readonly', '');
                area.style.position = 'fixed';
                area.style.left = '-9999px';
                document.body.appendChild(area);
                area.select();
                document.execCommand('copy');
                area.remove();
                button.textContent = 'Copied';
            }
            setTimeout(() => { button.textContent = 'Copy'; }, 1600);
        });
        this.escHandler = (event) => {
            if (event.key === 'Escape') this.close();
        };
        document.addEventListener('keydown', this.escHandler);
    },

    close() {
        const modal = document.getElementById('resumePreviewModal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
            if (this.escHandler) document.removeEventListener('keydown', this.escHandler);
        }
    }
};

window.resumePreview = resumePreview;

let resumeData = null;

async function ensureResumeData(detail) {
    if (detail) resumeData = detail;
    if (resumeData) return resumeData;
    const response = await fetch('data/content.json');
    if (!response.ok) throw new Error('Resume data unavailable');
    resumeData = await response.json();
    return resumeData;
}

document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href="#resume"]');
    if (!link) return;
    event.preventDefault();
    const data = await ensureResumeData();
    initResumeGenerator(data);
    resumePreview.show(data);
});

window.addEventListener('contentLoaded', (event) => {
    ensureResumeData(event.detail).then((data) => initResumeGenerator(data));
});

function initResumeGenerator(contentData) {
    if (!document.getElementById('resumePreviewStyles')) {
        const styles = document.createElement('style');
        styles.id = 'resumePreviewStyles';
        styles.textContent = `
            .resume-preview-modal {
                position: fixed; inset: 0; z-index: 10000;
                background: rgba(10, 10, 10, 0.45);
                display: flex; align-items: center; justify-content: center;
                padding: 24px;
            }
            .resume-preview-container {
                background: #ffffff; color: #0a0a0a;
                border: 1px solid #d7e8db; border-radius: 2px;
                max-width: 820px; width: 100%; max-height: 90vh;
                display: flex; flex-direction: column;
                box-shadow: 0 24px 60px rgba(10, 10, 10, 0.16);
            }
            .resume-preview-header, .resume-preview-footer {
                display: flex; align-items: center; justify-content: space-between; gap: 12px;
                padding: 14px 22px; background: #d8f5df; border-color: #d7e8db;
            }
            .resume-preview-header { border-bottom: 1px solid #d7e8db; }
            .resume-preview-footer { border-top: 1px solid #d7e8db; justify-content: flex-end; }
            .resume-preview-header h2 {
                margin: 0; font-family: "JetBrains Mono", ui-monospace, monospace;
                font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600;
            }
            .resume-preview-content {
                overflow-y: auto; padding: 32px 36px 28px; background: #fff;
                user-select: text;
            }
            .preview-section { margin-bottom: 22px; padding-bottom: 18px; border-bottom: 1px solid #d7e8db; }
            .preview-section:last-child { border-bottom: 0; margin-bottom: 0; padding-bottom: 0; }
            .preview-header-section h1 {
                font-family: Outfit, sans-serif; font-size: 32px; letter-spacing: -0.04em;
                margin: 0 0 6px; line-height: 1;
            }
            .preview-title {
                font-family: "JetBrains Mono", ui-monospace, monospace;
                font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
                color: #146c43; margin: 0 0 8px;
            }
            .preview-contact, .preview-company, .preview-job-header span {
                font-family: "JetBrains Mono", ui-monospace, monospace;
                font-size: 12px; color: #3d5248;
            }
            .preview-heading {
                font-family: "JetBrains Mono", ui-monospace, monospace;
                font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
                color: #146c43; margin: 0 0 12px;
            }
            .preview-section-content p, .preview-achievements li {
                font-family: Outfit, sans-serif; font-size: 14px; line-height: 1.6; color: #243028;
            }
            .preview-job { margin-bottom: 16px; }
            .preview-job:last-child { margin-bottom: 0; }
            .preview-job-header { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
            .preview-job-header strong { font-family: Outfit, sans-serif; font-size: 16px; letter-spacing: -0.02em; }
            .preview-company { margin: 2px 0 8px; }
            .preview-achievements { list-style: none; margin: 0; padding: 0; }
            .preview-achievements li { position: relative; padding-left: 14px; margin-bottom: 6px; }
            .preview-achievements li:before { content: "–"; position: absolute; left: 0; color: #146c43; }
            .resume-action {
                font-family: "JetBrains Mono", ui-monospace, monospace;
                font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
                padding: 8px 14px; border-radius: 2px; cursor: pointer;
            }
            .resume-action-primary { background: #146c43; color: #fff; border: 1px solid #146c43; }
            .resume-action-primary:hover { background: #0f5534; }
            .resume-action-ghost { background: #fff; color: #0a0a0a; border: 1px solid #d7e8db; }
            .resume-action-ghost:hover { border-color: #146c43; background: #b7ebc6; }
            .close-preview { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; background: #fff; border: 1px solid #d7e8db; padding: 6px 10px; cursor: pointer; }
        `;
        document.head.appendChild(styles);
    }

    document.querySelectorAll('a[href="#resume"]').forEach((link) => {
        if (link.dataset.resumeBound === '1') return;
        link.dataset.resumeBound = '1';
        link.addEventListener('click', (event) => {
            event.preventDefault();
            resumePreview.show(contentData);
        });
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateResumePDF, resumePreview, initResumeGenerator };
}
