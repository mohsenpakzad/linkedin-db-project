import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// user
import { createUsersTable } from '@/db/user/users'
import { createAccomplishmentsTable } from '@/db/user/accomplishments'
import { createSkillsTable } from '@/db/user/skills'
import { createLanguagesTable } from '@/db/user/languages'
import { createUserLanguageTable } from '@/db/user/userLanguage'
import { createFavoritesTable } from '@/db/user/favorites'
import { createUserEndorsedSkillTable } from '@/db/user/userEndorsedSkill'
import { createInvitationsTable } from '@/db/user/invitations'
import { createConnectionsTable } from '@/db/user/connections'
import { createNotificationsTable } from '@/db/user/notifications'

// messaging
import { createChatsTable } from '@/db/messaging/chats'
import { createMessagesTable } from '@/db/messaging/messages'
import { createUserChatsTable } from '@/db/messaging/userChats'

// posting
import { createPostsTable } from '@/db/posting/posts'
import { createCommentsTable } from '@/db/posting/comments'
import { createPostLikesTable } from '@/db/posting/postLikes'
import { createCommentLikesTable } from '@/db/posting/commentLikes'

import { dropLanguagesTable, insertLanguage } from './user/languages'

sqlite3.verbose()
let db

export async function openDb() {
    db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    })
}

export async function closeDb() {
    if (db) await db.close()
}

export function getDb() {
    return db
}

// HELPERS:
// exec for parameterless query
// run is like exec but has param
// get for getting one row (as object)
// all for getting multiple rows (as list)
// https://github.com/kriasoft/node-sqlite
export async function createTables() {

    // TODO set ON DELETE and ON UPDATE for all tables

    // the order of creating tables is important due another tables foreign key definition

    // user tables
    await createUsersTable()
    await createAccomplishmentsTable()
    await createSkillsTable()
    await createFavoritesTable()
    await createUserEndorsedSkillTable()
    await createInvitationsTable()
    await createConnectionsTable()
    await createNotificationsTable()

    // posting tables 
    await createPostsTable()
    await createCommentsTable()
    await createPostLikesTable()
    await createCommentLikesTable()

    // messaging tables  //DO NOT CHANGE THE PLACE (or you will die by saina's rage -_-)
    await createChatsTable()
    await createMessagesTable()
    await createUserChatsTable()
}

export async function generateApplicationData() {
    await dropLanguagesTable()
    await createLanguagesTable()
    await createUserLanguageTable()

    // WARNING! DO NOT CHANGE THE ORDER OR REMOVE ITEMS OR USER WILL BE MAD AT US!
    await insertLanguage({name: 'English'})
    await insertLanguage({name: 'Persian'})
    await insertLanguage({name: 'Russian'})
    await insertLanguage({name: 'German'})
    await insertLanguage({name: 'French'})
    await insertLanguage({name: 'Chinese'})
    await insertLanguage({name: 'Korean'})
}
