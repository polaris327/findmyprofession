export var ProfileTabMode;
(function (ProfileTabMode) {
    ProfileTabMode[ProfileTabMode["CREATE"] = 0] = "CREATE";
    ProfileTabMode[ProfileTabMode["VIEW"] = 1] = "VIEW";
    ProfileTabMode[ProfileTabMode["EDIT"] = 2] = "EDIT"; /*Describe when user has reference and edit it*/
})(ProfileTabMode || (ProfileTabMode = {}));
export var AccordionData = [
    {
        id: 1,
        title: 'Profile',
        image_src: 'profile-card'
    },
    {
        id: 2,
        title: 'Career Preferences ',
        image_src: 'profile-career-preferences'
    },
    {
        id: 3,
        title: 'Education & Work Experience',
        image_src: 'profile-education-work'
    },
    {
        id: 4,
        title: 'References',
        image_src: 'profile-references'
    }, {
        id: 5,
        title: 'Documents',
        image_src: 'profile-documents'
    },
    {
        id: 6,
        title: 'EEOC Questions',
        image_src: 'profile-eeoc'
    }
];
