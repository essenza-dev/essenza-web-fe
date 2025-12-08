'use client'

import { useState, useEffect, useCallback } from 'react'

import { useRouter } from 'next/navigation'

import {
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Switch,
  Typography
} from '@mui/material'

import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'

import { getPageById, updatePage, createPage } from '@/services/pages'

import useSnackbar from '@/@core/hooks/useSnackbar'

import EditorToolbar from '@/@core/components/editor/EditorToolbar'

import '@/libs/styles/tiptapEditor.css'
import FormActions from '@/components/FormActions'
import BackdropLoading from '@/components/BackdropLoading'
import { handleApiResponse } from '@/utils/handleApiResponse'
import { slugify } from '@/utils/helpers'

const defaultData = {
  title: '',
  slug: '',
  content: '',
  is_active: true,
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  template: ''
}

const PageForm = ({ id }) => {
  const router = useRouter()
  const { success, error, SnackbarComponent } = useSnackbar()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(defaultData)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Write page content...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    content: data?.content,
    onUpdate({ editor }) {
      setData(prev => ({ ...prev, content: editor.getHTML() }))
    }
  })

  const fetchPage = useCallback(
    async id => {
      setLoading(true)

      try {
        const res = await getPageById(id)

        setData(res.data)

        if (editor && res.data?.content) {
          editor.commands.setContent(res.data?.content, false)
        }
      } catch {
        error('Failed to load project details.')
      } finally {
        setLoading(false)
      }
    },
    [error, editor]
  )

  const handleChange = e => {
    const { name, value } = e.target

    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleToggleActive = e => {
    setData(prev => ({ ...prev, is_active: e.target.checked }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    await handleApiResponse(() => (id ? updatePage(id, data) : createPage(data)), {
      success: msg => success(msg),
      error: msg => error(msg),
      onSuccess: () =>
        setTimeout(() => {
          router.push('/esse-panel/pages')
        }, 1000),
      onError: () => {
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    if (id) fetchPage(id)
  }, [id, fetchPage])

  useEffect(() => {
    if (data?.title) {
      const newSlug = slugify(data?.title)

      setData(prevData => ({
        ...prevData,
        slug: newSlug
      }))
    } else {
      setData(prevData => ({
        ...prevData,
        slug: ''
      }))
    }
  }, [data?.title, setData])

  return (
    <>
      <Card className='shadow'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <CardHeader title={id ? 'Edit Page' : 'Add Page'} />
          <Divider />
          <CardContent>
            <Grid container spacing={5}>
              <Grid item sm={12}>
                <TextField
                  size='small'
                  label='Title'
                  name='title'
                  value={data?.title}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  size='small'
                  label='Slug'
                  name='slug'
                  value={data?.slug}
                  onChange={handleChange}
                  helperText='Example: about-us'
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <Typography className='mt-6 mb-2'>Content</Typography>
                <Card className='p-0 border shadow-none'>
                  <CardContent className='p-0'>
                    <EditorToolbar editor={editor} />
                    <Divider className='my-2' />
                    <EditorContent editor={editor} className='min-h-[50vh]' />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel
                  control={<Switch checked={data?.is_active} onChange={handleToggleActive} />}
                  label={data?.is_active ? 'Active' : 'Inactive'}
                />
              </Grid>
              <Grid item sm={12}>
                <Divider textAlign='left'>SEO Meta</Divider>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  size='small'
                  label='Meta Title'
                  name='meta_title'
                  value={data?.meta_title}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  size='small'
                  label='Meta Description'
                  name='meta_description'
                  value={data?.meta_description}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  size='small'
                  label='Meta Keywords'
                  name='meta_keywords'
                  value={data?.meta_keywords}
                  onChange={handleChange}
                  helperText='Comma separated keywords, Example: Internasional, Promo, Ceramic'
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <FormActions onCancel={() => router.push('/esse-panel/pages')} isEdit={id} />
        </form>
      </Card>
      {SnackbarComponent}
      <BackdropLoading open={loading} />
    </>
  )
}

export default PageForm
