import { Children, useEffect, useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { useAuthContext } from 'src/auth/hooks';
import { getProjects } from 'src/redux/slices/projects';
import { getRoadmaps } from 'src/redux/slices/roadmap';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { getCourses } from 'src/redux/slices/course';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  interns: icon('ic_user'),
  projects: icon('ic_folder'),
  inquiry: icon('ic_inquiry'),
  course: <Iconify icon="fa6-solid:book-open" />,
  // roadmap: icon('ic_roadmap_2'),
  roadmap: icon('ic_roadmap'),
  community: icon('ic_community'),
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const { isAdmin } = useAuthContext();
  const { projects } = useSelector((state: RootState) => state.projects);
  const { roadmaps } = useSelector((state: RootState) => state.roadmap);
  // const { courses } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(getProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getRoadmaps());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getCourses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unarchivedProjects = useMemo(
    () =>
      projects && Array.isArray(projects) && projects.length > 0
        ? projects.filter((project) => !project.is_archived)
        : [],
    [projects]
  );

  const data = useMemo(
    () => [
      {
        // subheader: t('Dashboard'),
        items: [
          // INQUIRY
          isAdmin
            ? {
              title: t('Dashboard'),
              path: paths.dashboard.dashboard.root,
              icon: ICONS.dashboard,
              // children: [
              //   // { title: t('profile'), path: paths.dashboard.user.root },
              //   // { title: t('cards'), path: paths.dashboard.user.cards },
              //   { title: t('list'), path: paths.dashboard.inquiry.list },
              //   // { title: t('create'), path: paths.dashboard.user.new },
              //   // { title: t('edit'), path: paths.dashboard.user.demo.edit },
              //   // { title: t('account'), path: paths.dashboard.user.account },
              // ],
            }
            : null,

          isAdmin
            ? {
              title: t('Manage Accounts'),
              path: paths.dashboard.manageAccount.root,
              icon: ICONS.inquiry,
              children: [
                { title: t('Member/Patient'), path: paths.dashboard.manageAccount.patient },
                { title: t('Facility'), path: paths.dashboard.manageAccount.facility },
                { title: t('Render Employees'), path: paths.dashboard.manageAccount.renderEmployee },
                { title: t('Organizations'), path: paths.dashboard.manageAccount.organizations },
                { title: t('Deals'), path: paths.dashboard.manageAccount.deals },
              ],
            }
            : null,

          isAdmin
            ? {
              title: t('Appointment'),
              path: paths.dashboard.appointment.root,
              icon: ICONS.inquiry,
            }
            : null,
          isAdmin
            ? {
              title: t('Health Record'),
              path: paths.dashboard.healthRecord.root,
              icon: ICONS.inquiry,
            }
            : null,

          isAdmin
            ? {
              title: t('HMO'),
              path: paths.dashboard.hmo.root,
              icon: ICONS.inquiry,
              children: [
                { title: t('Add Hmo'), path: paths.dashboard.hmo.addHmo },
                { title: t('Enrollee'), path: paths.dashboard.hmo.enrollee },
                { title: t('Bills & Claims'), path: paths.dashboard.hmo.billsClaims },
                { title: t('Facilities'), path: paths.dashboard.hmo.facilities },
              ],
            }
            : null,

          isAdmin
            ? {
              title: t('search-patient'),
              path: paths.dashboard.searchPatient.root,
              icon: ICONS.inquiry,
            }
            : null,

          isAdmin
            ? {
              title: t('Billings'),
              path: paths.dashboard.billings.root,
              icon: ICONS.inquiry,
              children: [
                { title: t('View All Billings'), path: paths.dashboard.billings.viewAllBillings },
                { title: t('Billings By Hospital'), path: paths.dashboard.billings.billingsByHospital },
                { title: t('Disputed Billings'), path: paths.dashboard.billings.disputedBillings },
              ],
            }
            : null,

          isAdmin
            ? {
              title: t('Savings Card'),
              path: paths.dashboard.savingsCard.root,
              icon: ICONS.inquiry,
              children: [
                { title: t('Member'), path: paths.dashboard.savingsCard.members },
                { title: t('Companies'), path: paths.dashboard.savingsCard.companies },
                { title: t('Merchants'), path: paths.dashboard.savingsCard.merchants },
                { title: t('Merchant Recommendations'), path: paths.dashboard.savingsCard.merchantRecommendations },
                { title: t('Payment'), path: paths.dashboard.savingsCard.payment },
                { title: t('Approved Claims'), path: paths.dashboard.savingsCard.approvedClaims },
                {
                  title: t('Tariff'),
                  path: paths.dashboard.savingsCard.tariff.root,
                  children: [
                    { title: t('Update'), path: paths.dashboard.savingsCard.tariff.update },
                    { title: t('View By Team'), path: paths.dashboard.savingsCard.tariff.viewByTeam },
                    { title: t('View By Merchant'), path: paths.dashboard.savingsCard.tariff.viewByMerchant },
                  ]
                },
                {
                  title: t('Rebate'),
                  path: paths.dashboard.savingsCard.rebate.root,
                  children: [
                    { title: t('Manage'), path: paths.dashboard.savingsCard.rebate.manage },
                    { title: t('Review'), path: paths.dashboard.savingsCard.rebate.review },
                  ],
                },
                {
                  title: t('Pan Card'),
                  path: paths.dashboard.savingsCard.pancard.root,
                  children: [
                    { title: t('Manage'), path: paths.dashboard.savingsCard.pancard.manage },
                    { title: t('Review'), path: paths.dashboard.savingsCard.pancard.review },
                  ],
                },
                { title: t('Transactions'), path: paths.dashboard.savingsCard.transactions },
                {
                  title: t('Top-up'),
                  path: paths.dashboard.savingsCard.topUp.root,
                  children: [
                    { title: t('Top-up'), path: paths.dashboard.savingsCard.topUp.topupList },
                    { title: t('Reconciliation'), path: paths.dashboard.savingsCard.topUp.reconciliation },
                  ],
                },
                { title: t('Report'), path: paths.dashboard.savingsCard.report },
                { title: t('Overdrafts'), path: paths.dashboard.savingsCard.overdrafts },
                { title: t('Withdrawal Requests'), path: paths.dashboard.savingsCard.withdrawalRequests },
                { title: t('Pending Requests'), path: paths.dashboard.savingsCard.pendingRequests },
                { title: t('Summary'), path: paths.dashboard.savingsCard.summary },
                { title: t('Settings'), path: paths.dashboard.savingsCard.settings },
              ],
            }
            : null,

          isAdmin
            ? {
              title: t('Inventory'),
              path: paths.dashboard.inventory.root,
              icon: ICONS.inquiry,
            }
            : null,

          isAdmin
            ? {
              title: t('Settings'),
              path: paths.dashboard.settings.root,
              icon: ICONS.ecommerce,
            }
            : null,
          // PROJECTS
          // {
          //   title: t('Projects'),
          //   path: paths.dashboard.projects.root,
          //   icon: ICONS.projects,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.projects.list },
          //     ...(unarchivedProjects.length > 0
          //       ? unarchivedProjects.map((project) => ({
          //         title: t(`${project.name}`),
          //         path: paths.dashboard.projects.id(project._id as string),
          //       }))
          //       : []),
          //   ],
          // },

          // INTERNS
          // isAdmin
          //   ? {
          //     title: t('interns'),
          //     path: paths.dashboard.intern.root,
          //     icon: ICONS.interns,
          //     children: [{ title: t('list'), path: paths.dashboard.intern.list }],
          //   }
          //   : null,
          // // ROADMAP
          // isAdmin
          //   ? {
          //     title: t('Roadmap'),
          //     path: paths.dashboard.roadmap.root,
          //     icon: ICONS.roadmap,
          //     children: [
          //       { title: t('create'), path: paths.dashboard.roadmap.create },
          //       { title: t('list'), path: paths.dashboard.roadmap.list },
          //       ...(roadmaps && Array.isArray(roadmaps) && roadmaps.length > 0
          //         ? roadmaps.map((item) => ({
          //           title: t(`${item?.title}`),
          //           path: paths.dashboard.roadmap.id(item._id as string),
          //         }))
          //         : []),
          //     ],
          //   }
          //   : null,
          // {
          //   title: t('course'),
          //   icon: ICONS.course,
          //   path: paths.dashboard.courses.root,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.courses.list },
          //     ...(courses && Array.isArray(courses) && courses.length > 0
          //       ? courses.map((course) => ({
          //         title: t(`${course?.course_name}`),
          //         path: paths.dashboard.courses.id(course._id as string),
          //       }))
          //       : []),
          //   ],
          // },
          // {
          //   title: t('Courses'),
          //   icon: ICONS.course,
          //   path: paths.dashboard.courses.root,
          //   children: [
          //     { title: t('list'), path: paths.dashboard.courses.list },
          //     ...(courses && Array.isArray(courses) && courses.length > 0
          //       ? courses.map((course) => ({
          //           title: t(course.course_name),
          //           path: paths.dashboard.courses.id(course._id as string),
          //           children: [
          //             ...(subject &&
          //             Array.isArray(subject) &&
          //             subject.filter((sub) => sub.course._id === course._id).length > 0
          //               ? subject
          //                   .filter((sub) => sub.course._id === course._id)
          //                   .map((sub) => ({
          //                     title: t(sub.subject_name),
          //                     path: paths.dashboard.courses.subjectId(
          //                       subject.course_id as string,
          //                       sub._id as string
          //                     ),
          //                   }))
          //               : []),
          //           ],
          //         }))
          //       : []),
          //   ],
          // },
          // {
          //   title: t('Community'),
          //   icon: ICONS.community,
          //   path: paths.dashboard.community.root,
          // },
          // {
          //   title: t('Chat'),
          //   icon: ICONS.chat,
          //   path: paths.dashboard.chat.root,
          //   info: (
          //     <Label color="info" startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}>
          //       NEW
          //     </Label>
          //   ),
          // },
          // USER
          // {
          //   title: t('user'),
          //   path: paths.dashboard.user.root,
          //   icon: ICONS.user,
          //   children: [
          //     { title: t('profile'), path: paths.dashboard.user.root },
          //     { title: t('cards'), path: paths.dashboard.user.cards },
          //     { title: t('list'), path: paths.dashboard.user.list },
          //     { title: t('create'), path: paths.dashboard.user.new },
          //     { title: t('edit'), path: paths.dashboard.user.demo.edit },
          //     { title: t('account'), path: paths.dashboard.user.account },
          //   ],
          // },
        ].filter(Boolean),
      },
    ],
    [t, isAdmin]
  );

  return data;
}
