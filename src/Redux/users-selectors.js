export const getUsersSelector = (state) => {
    return state.usersPage.users;
};

export const getPageSizeSelector = (state) => {
    return state.usersPage.pageSize
};

export const getTotalUsersCountSelector = (state) => {
    return state.usersPage.totalUsersCount
};

export const getCurrentPageSelector = (state) => {
    return state.usersPage.currentPage
};

export const getPreloaderSelector = (state) => {
    return state.usersPage.preloader
};

export const getFollowingInProgressSelector = (state) => {
    return state.usersPage.followingInProgress
};


// здесь должен был быть reselect, но не будет, но мог бы