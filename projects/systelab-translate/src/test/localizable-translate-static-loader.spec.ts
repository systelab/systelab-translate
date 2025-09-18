import { LocalizableTranslateStaticLoader } from '../public-api';
import { HttpClient } from '@angular/common/http';
import { Location as AngularLocation } from '@angular/common';

describe('LocalizableTranslateStaticLoader Constructor', () => {
	let httpMock: HttpClient;
	let locationMock: jasmine.SpyObj<AngularLocation>;
	let originalGetPathname: () => string;

	beforeEach(() => {
		httpMock = {} as HttpClient;
		locationMock = jasmine.createSpyObj('Location', ['path']);

		// Store original method with correct type
		originalGetPathname = LocalizableTranslateStaticLoader.prototype['getWindowPathname'];
	});

	afterEach(() => {
		// Restore original method
		LocalizableTranslateStaticLoader.prototype['getWindowPathname'] = originalGetPathname;
	});

	function createLoader(pathname: string, locationPath: string | null = null): LocalizableTranslateStaticLoader {
		// Mock location.path()
		if (locationPath === null) {
			locationMock.path.and.returnValue('');
		} else {
			locationMock.path.and.returnValue(locationPath);
		}

		// Add a mock method to the class prototype to return our test pathname
		LocalizableTranslateStaticLoader.prototype['getWindowPathname'] = () => pathname;

		return new LocalizableTranslateStaticLoader(httpMock, locationMock);
	}

	describe('special root paths', () => {
		it('should set prefix to empty string for root path "/"', () => {
			const loader = createLoader('/');
			expect(loader['prefix'])
				.toBe('');
		});

		it('should set prefix to empty string for context.html path', () => {
			const loader = createLoader('/context.html');
			expect(loader['prefix'])
				.toBe('');
		});
	});

	describe('prefix handling for index.html', () => {
		it('should remove index.html from the end of the path', () => {
			const loader = createLoader('/app/folder/index.html');
			expect(loader['prefix'])
				.toBe('/app/folder/');
		});

		it('should handle path with index.html in the middle correctly', () => {
			const loader = createLoader('/app/index.html/page');
			expect(loader['prefix'])
				.toBe('/app/index.html/page/');
		});
	});

	describe('trailing slash handling', () => {
		it('should remove trailing slash from path before processing', () => {
			const loader = createLoader('/app/folder/');
			expect(loader['prefix'])
				.toBe('/app/folder/');
		});

		it('should add trailing slash to non-empty prefix at the end', () => {
			const loader = createLoader('/app/folder');
			expect(loader['prefix'])
				.toBe('/app/folder/');
		});
	});

	describe('location path handling', () => {
		it('should handle path ending with route that matches location path', () => {
			const loader = createLoader('/app/dashboard', '/dashboard');
			expect(loader['prefix'])
				.toBe('/app/');
		});

		it('should handle location path with query parameters', () => {
			const loader = createLoader('/app/dashboard', '/dashboard?param=value');
			expect(loader['prefix'])
				.toBe('/app/');
		});

		it('should not modify prefix when location path does not match the end', () => {
			const loader = createLoader('/app/other', '/dashboard');
			expect(loader['prefix'])
				.toBe('/app/other/');
		});

		it('should handle empty location path', () => {
			const loader = createLoader('/app/folder', '');
			expect(loader['prefix'])
				.toBe('/app/folder/');
		});

		// The test for undefined location path needs special handling
		it('should handle undefined location path by checking explicitly', () => {
			locationMock.path.and.returnValue(undefined);

			// We need to handle this test case separately since it uses spyOnProperty
			LocalizableTranslateStaticLoader.prototype['getWindowPathname'] = () => '/somepath';

			const loader = new LocalizableTranslateStaticLoader(httpMock, locationMock);
			expect(loader['prefix'])
				.toBe('/somepath/');
		});
	});

	describe('complex path combinations', () => {
		it('should handle path with index.html and matching route', () => {
			const loader = createLoader('/app/dashboard/index.html', '/dashboard');
			expect(loader['prefix'])
				.toBe('/app/');
		});

		it('should handle path with trailing slash and matching route', () => {
			const loader = createLoader('/app/dashboard/', '/dashboard');
			expect(loader['prefix'])
				.toBe('/app/');
		});
	});
});
