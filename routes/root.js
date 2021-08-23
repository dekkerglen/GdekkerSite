const express = require('express');
const nodemailer = require('nodemailer');
const { render } = require('../serverjs/render');
const { getPodcasts } = require('../serverjs/podcasts');

const router = express.Router();

// Home route
router.get('/', async (req, res) => {
  return render(req, res, 'LandingPage', {
    episodes: getPodcasts().master.episodes.slice(0, 3),
  });
});

router.get('/contact', (req, res) => {
  return render(req, res, 'ContactPage');
});

router.get('/badquiz', (req, res) => {
  return render(req, res, 'ErrorPage', {
    title: '400: Your contact form submission failed due to an incorrect quiz answer.',
    details: 'Hint: The answer is one of the five colors of magic.',
  });
});

router.get('/contacted', (req, res) => {
  return render(req, res, 'ContactedPage');
});

router.get('/about', (req, res) => {
  return render(req, res, 'AboutPage');
});

router.get('/feed', (req, res) => {
  return render(req, res, 'FeedPage', {
    podcasts: getPodcasts(),
  });
});

router.get('/archive', (req, res) => {
  return render(req, res, 'ArchivePage', {
    podcasts: getPodcasts(),
  });
});

router.get('/episode/:guid', (req, res) => {
  return render(req, res, 'EpisodePage', {
    episode: getPodcasts().master.episodes.filter((episode) => episode.guid === req.params.guid)[0],
  });
});

router.get('/season/:index', (req, res) => {
  return render(req, res, 'SeasonPage', {
    episodes: getPodcasts()
      .master.episodes.filter((episode) => episode.season === req.params.index)
      .reverse(),
    season: req.params.index,
  });
});

router.post('/contact', (req, res) => {
  const { name, email, subject, message, quiz } = req.body;

  if (quiz.toLowerCase() !== 'green') {
    return res.redirect('/badquiz');
  }

  const to = 'solelysingleton@gmail.com';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to,
    subject: `${name} - ${subject}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } else {
      res.redirect('/contacted');
    }
  });
});

router.get('/tos', (req, res) => {
  return render(req, res, 'InfoPage', {
    title: 'Terms and Conditions',
    content: [
      {
        label: 'Introduction',
        text: `These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Solely Singleton accessible at cubecobra.com. These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions. These Terms and Conditions have been generated with the help of the Terms And Conditions Template. People below 18 years old are not allowed to use this Website. All users who are minors must have the permission of, and be directly supervised by, their parent or guardian to use this site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using this site.`,
      },
      {
        label: 'Intellectual Property Rights',
        text: `Other than the content you own, under these Terms, Solely Singleton and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.`,
      },
      {
        label: 'Restrictions',
        text: `You are specifically restricted from all of the following:`,
      },
      {
        label: '',
        text: `selling, sublicensing and/or otherwise commercializing any Website material`,
      },
      {
        label: '',
        text: `using this Website in any way that is or may be damaging to this Website`,
      },
      {
        label: '',
        text: `using this Website in any way that impacts user access to this Website`,
      },
      {
        label: '',
        text: `using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity`,
      },
      {
        label: '',
        text: `engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website`,
      },
      {
        label: '',
        text: `using this Website to engage in any advertising or marketing`,
      },
      {
        label: '',
        text: `Certain areas of this Website are restricted from being access by you and Solely Singleton may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.`,
      },
      {
        label: 'Your Content',
        text: `
        In these terms and conditions, "your user content" means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to this website, for whatever purpose. You grant to Solely Singleton a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your user content in any existing or future media. You also grant to Solely Singleton the right to sub-license these rights, and the right to bring an action for infringement of these rights. Your user content must not be illegal or unlawful, must not infringe any third party's legal rights, and must not be capable of giving rise to legal action whether against you or Solely Singleton or a third party (in each case under any applicable law). You must not submit any user content to the website that is or has ever been the subject of any threatened or actual legal proceedings or other similar complaint. Solely Singleton reserves the right to edit or remove any material submitted to this website, or stored on Solely Singleton's servers, or hosted or published upon this website. Notwithstanding Solely Singleton's rights under these terms and conditions in relation to user content, Solely Singleton does not undertake to monitor the submission of such content to, or the publication of such content on, this website.`,
      },
      {
        label: 'Your Privacy',
        text: `Please read the Privacy Policy: cubecobra.com/privacy`,
      },
      {
        label: 'No warranties',
        text: `This Website is provided "as is," with all faults, and Solely Singleton express no representations or warranties, of any kind related to this Website or the materials contained on this Website.Also, nothing contained on this Website shall be interpreted as advising you.`,
      },
      {
        label: 'Limitation of liability',
        text: `In no event shall Solely Singleton, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. Solely Singleton, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.`,
      },
      {
        label: 'Reasonableness',
        text: `By using Solely Singleton, you agree that the exclusions and limitations of liability set out in this website disclaimer are reasonable. If you do not think they are reasonable, you must not use this website.`,
      },
      {
        label: 'Other Parties',
        text: `You accept that, as a limited liability entity, Solely Singleton has an interest in limiting the personal liability of its officers and employees. You agree that you will not bring any claim personally against Solely Singleton's officers or employees in respect of any losses you suffer in connection with the website. You agree that the limitations of warranties and liability set out in this website disclaimer will protect Solely Singleton's officers, employees, agents, subsidiaries, successors, assigns and sub-contractors as well as Solely Singleton.`,
      },
      {
        label: 'Indemnification',
        text: `You hereby indemnify to the fullest extent Solely Singleton from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.`,
      },
      {
        label: 'Severability',
        text: `If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.`,
      },
      {
        label: 'Variation of Terms',
        text: `Solely Singleton is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.`,
      },
      {
        label: 'Assignment',
        text: `
        The Solely Singleton is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.`,
      },
      {
        label: 'Entire Agreement',
        text: `These Terms constitute the entire agreement between Solely Singleton and you in relation to your use of this Website, and supersede all prior agreements and understandings.`,
      },
    ],
  });
});

router.get('/privacy', (req, res) => {
  return render(req, res, 'InfoPage', {
    title: 'Privacy Policy',
    content: [
      {
        label: 'Introduction',
        text: 'Effective date: June 22, 2019 ',
      },
      {
        label: '',
        text: 'Solely Singleton ("us", "we", or "our") operates the cubecobra.com website (the "Service").',
      },
      {
        label: '',
        text: 'This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. Our Privacy Policy for Solely Singleton is created with the help of the Free Privacy Policy Generator. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from cubecobra.com/tos',
      },
      {
        label: 'Information Collection And Use',
        text: 'We collect several different types of information for various purposes to provide and improve our Service to you.',
      },
      {
        label: 'Types of Data Collected',
        text: 'Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, Cookies and Usage Data',
      },
      {
        label: '',
        text: `Usage Data: We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.`,
      },
      {
        label: '',
        text: `Tracking and Cookies Data: We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.`,
      },
      {
        label: 'Example of Cookies we use:',
        text: `Session Cookies. We use Session Cookies to operate our Service.`,
      },
      {
        label: '',
        text: `Preference Cookies. We use Preference Cookies to remember your preferences and various settings.`,
      },
      {
        label: '',
        text: `Security Cookies. We use Security Cookies for security purposes.`,
      },
      {
        label: 'Use of Data',
        text: `Solely Singleton uses the collected data for various purposes:`,
      },
      {
        label: '',
        text: `To provide and maintain the Service`,
      },
      {
        label: '',
        text: `To notify you about changes to our Service`,
      },
      {
        label: '',
        text: `To allow you to participate in interactive features of our Service when you choose to do so`,
      },
      {
        label: '',
        text: `To provide customer care and support`,
      },
      {
        label: '',
        text: `To provide analysis or valuable information so that we can improve the Service`,
      },
      {
        label: '',
        text: `To monitor the usage of the Service`,
      },
      {
        label: '',
        text: `To detect, prevent and address technical issues`,
      },
      {
        label: 'Transfer Of Data',
        text: `Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction. If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer. Solely Singleton will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.`,
      },
      {
        label: 'Disclosure Of Data',
        text: `Solely Singleton may disclose your Personal Data in the good faith belief that such action is necessary to:`,
      },
      {
        label: '',
        text: `To comply with a legal obligation`,
      },
      {
        label: '',
        text: `To protect and defend the rights or property of Solely Singleton`,
      },
      {
        label: '',
        text: `To prevent or investigate possible wrongdoing in connection with the Service`,
      },
      {
        label: '',
        text: `To protect the personal safety of users of the Service or the public`,
      },
      {
        label: '',
        text: `To protect against legal liability`,
      },
      {
        label: 'Security Of Data',
        text: `The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to usecommercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.`,
      },
      {
        label: 'Service Providers',
        text: `We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-relatedservices or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.`,
      },
      {
        label: 'Links To Other Sites',
        text: `Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.`,
      },
      {
        label: "Children's Privacy",
        text: `Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.`,
      },
      {
        label: 'Changes To This Privacy Policy',
        text: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.y`,
      },
      {
        label: 'Contact Us',
        text: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.`,
      },
      {
        label: '',
        text: `By email: solelysingleton@gmail.com`,
      },
    ],
  });
});

router.get('/cookies', (req, res) => {
  return render(req, res, 'InfoPage', {
    title: 'Cookies Policy',
    content: [
      {
        label: "Do we use 'cookies'?",
        text:
          "Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow)" +
          " that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use" +
          ' cookies to maintan login sessions. They are also used to help us understand your preferences based on previous or' +
          ' current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic' +
          ' and site interaction so that we can offer better site experiences and tools in the future.',
      },
      {
        label: 'We use cookies to:',
        text:
          "Understand and save user's preferences for future visits, Compile aggregate data about site traffic and site interactions in order to offer better site" +
          ' experiences and tools in the future. We may also use trusted third' +
          ' party services that track this information on our behalf.' +
          ' You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser (like Internet Explorer) settings.' +
          " Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies.",
      },
      {
        label: 'If users disable cookies in their browser',
        text:
          'If you turn cookies off, some features will be disabled. It will turn off some of the features that make your site experience more efficient and some of our services will' +
          ' not function properly, including but not limited to Persistent Login.',
      },
    ],
  });
});

module.exports = router;
