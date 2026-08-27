// Copyright 2024 Kakusui LLC (https://kakusui.org) (https://github.com/Kakusui) (https://github.com/Kakusui/EasyTL-Frontend)
// Use of this source code is governed by an GNU Affero General Public License v3.0
// license that can be found in the LICENSE file.

const DEFAULT_TURNSTILE_SITE_KEY = '0x4AAAAAAAbu-SlGyNF03684'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || DEFAULT_TURNSTILE_SITE_KEY

const requiresTurnstile = () =>
{
  const hostname = window.location.hostname
  return hostname === 'easytl.org' ||
    hostname === 'easytl-frontend.pages.dev' ||
    hostname.endsWith('.easytl-frontend.pages.dev')
}

export { TURNSTILE_SITE_KEY, requiresTurnstile }
